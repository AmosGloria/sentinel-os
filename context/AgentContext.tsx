"use client";
import React, { createContext, useContext, useState, useMemo } from 'react';

type AgentStatus = 'idle' | 'infiltrating' | 'strategizing' | 'executing' | 'error';

interface AgentState {
  currentStatus: AgentStatus;
  logs: { timestamp: string; message: string; agent: string }[];
  pendingApprovals: { id: string; action: string; description: string }[];
}

const AgentContext = createContext<{
  state: AgentState;
  addLog: (agent: string, message: string) => void;
  requestApproval: (id: string, action: string, description: string) => void;
  approveAction: (id: string) => void;
} | undefined>(undefined);

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AgentState>({
    currentStatus: 'idle',
    logs: [],
    pendingApprovals: [],
  });

  const actions = useMemo(() => ({
    addLog: (agent: string, message: string) => {
      setState(prev => ({
        ...prev,
        logs: [...prev.logs, { timestamp: new Date().toLocaleTimeString(), message, agent }]
      }));
    },
    requestApproval: (id: string, action: string, description: string) => {
      setState(prev => ({
        ...prev,
        pendingApprovals: [...prev.pendingApprovals, { id, action, description }]
      }));
    },
    approveAction: (id: string) => {
      setState(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals.filter(a => a.id !== id)
      }));
    }
  }), []);

  return (
    <AgentContext.Provider value={{ state, ...actions }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgent must be used within AgentProvider");
  return context;
};