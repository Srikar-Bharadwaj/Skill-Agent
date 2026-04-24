import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const dbPath = path.join(process.cwd(), "db.json");
  let notes = [];
  
  try {
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, "utf-8");
      notes = JSON.parse(fileContent).slice(0, 10); // Show last 10
    }
  } catch (error) {
    console.error("Failed to read DB", error);
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 relative overflow-hidden">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] orb" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] orb" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 bg-black/40 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-primary" /> Quick Revision Notes
            </h1>
            <p className="text-gray-400 text-sm mt-1">Review your recent technical interview answers.</p>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="bg-black/40 border border-white/5 rounded-2xl p-8 text-center text-gray-500">
            No notes yet. Take an assessment to start building your knowledge base!
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note, i) => (
              <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Clock className="w-3 h-3" /> {new Date(note.timestamp).toLocaleString()}
                </div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Q: {note.question}</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <p className="text-sm text-gray-300 italic">" {note.userAnswer} "</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
