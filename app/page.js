import SkillAssessmentApp from "@/components/SkillAssessmentApp";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">

      
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Catalyst <span className="text-gradient">AI</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Cheat-proof technical interviews. Upload your JD and Resume to begin your adaptive assessment.
          </p>
        </header>
        
        <SkillAssessmentApp />

        <div className="mt-8 text-center">
          <a href="/notes" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-black/40 px-4 py-2 rounded-full border border-white/5 hover:border-primary/50">
            View Quick Revision Notes
          </a>
        </div>
      </div>
    </main>
  );
}
