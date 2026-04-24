"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileSearch, CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

export default function AtsScanner({ jd, resume, onProceed }) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scanResume = async () => {
      try {
        const res = await fetch("/api/ats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jd, resume })
        });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    scanResume();
  }, [jd, resume]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-gray-400">Running ATS Simulation...</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-2">
          <FileSearch className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">ATS Resume Scan</h2>
        <p className="text-gray-400 text-sm">Review your resume match before the interview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center">
          <h3 className="text-gray-400 text-sm mb-2">Match Score</h3>
          <span className="text-5xl font-bold text-gradient">{result.atsScore}%</span>
        </div>
        
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5">
          <h3 className="text-gray-300 font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-400" /> Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missingKeywords?.length > 0 ? (
              result.missingKeywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs rounded-full">
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">All key terms matched!</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-3">
        <h3 className="text-gray-300 font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" /> Enhancement Suggestions
        </h3>
        <ul className="space-y-2 text-sm text-gray-400">
          {result.suggestions?.map((sug, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary">•</span> {sug}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onProceed}
          className="group flex items-center gap-2 bg-primary hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold transition-all"
        >
          Proceed to Interview <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
