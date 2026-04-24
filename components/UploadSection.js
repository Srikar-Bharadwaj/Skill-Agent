"use client";

import { useState } from "react";
import { FileText, Briefcase, ArrowRight } from "lucide-react";

export default function UploadSection({ onStart }) {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jd.trim() && resume.trim()) {
      onStart(jd, resume);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* JD Input */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Briefcase className="w-4 h-4 text-primary" />
            Job Description
          </label>
          <textarea
            required
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the target job description here..."
            className="w-full h-48 sm:h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
        </div>

        {/* Resume Input */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <FileText className="w-4 h-4 text-purple-400" />
            Your Resume
          </label>
          <textarea
            required
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your current resume text here..."
            className="w-full h-48 sm:h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={!jd.trim() || !resume.trim()}
          className="group relative flex items-center gap-2 bg-primary hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 h-full w-full bg-white/20 blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </form>
  );
}
