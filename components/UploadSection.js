"use client";

import { useState, useRef } from "react";
import { FileText, Briefcase, ArrowRight, Upload, Loader2 } from "lucide-react";


export default function UploadSection({ onStart }) {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jd.trim() && resume.trim()) {
      onStart(jd, resume);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsParsingPdf(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.text && data.text.trim()) {
        setResume(data.text);
      } else {
        alert("Could not extract text from this PDF. It may be an image-based PDF.");
      }
    } catch (error) {
      console.error("PDF upload error:", error);
      alert("Error parsing PDF.");
    } finally {
      setIsParsingPdf(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <FileText className="w-4 h-4 text-purple-400" />
              Your Resume
            </label>
            <div>
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileUpload} 
                ref={fileInputRef}
                className="hidden" 
                id="resume-upload" 
              />
              <label 
                htmlFor="resume-upload" 
                className="flex items-center gap-1 text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-purple-500/20"
              >
                {isParsingPdf ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                {isParsingPdf ? "Extracting..." : "Upload PDF"}
              </label>
            </div>
          </div>
          <textarea
            required
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            disabled={isParsingPdf}
            placeholder="Paste your current resume text here, or upload a PDF..."
            className="w-full h-48 sm:h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={!jd.trim() || !resume.trim() || isParsingPdf}
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
