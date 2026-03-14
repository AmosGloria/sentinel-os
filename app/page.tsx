import Link from 'next/link';

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-900 px-4">
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tighter">
          The Future of <span className="text-blue-600">Autonomous Ops</span>
        </h1>
        <p className="text-xl text-slate-500">Your digital tool that manages your business while you sleep.</p>
        
        <Link href="/auth">
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-10 py-4 rounded-xl text-lg font-bold shadow-2xl transition-all transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}