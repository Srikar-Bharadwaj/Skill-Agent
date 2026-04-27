"use client";

import { useState, useRef } from "react";
import { FileText, Briefcase, ArrowRight, Upload, Loader2 } from "lucide-react";

import * as pdfjs from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';

// Set up PDF.js Worker using unpkg which correctly hosts the .mjs file
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function UploadSection({ onStart }) {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jd.trim() && resume.trim()) {
      onStart(jd, resume);
    }
  };

  const performOcr = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ 
      data: arrayBuffer,
      disableAutoFetch: true,
      disableStream: true,
      disableFontFace: true
    }).promise;
    let fullText = "";

    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setOcrProgress(Math.floor(m.progress * 100));
        }
      },
    });

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      const { data: { text } } = await worker.recognize(canvas);
      fullText += text + "\n";
    }

    await worker.terminate();
    return fullText;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsParsingPdf(true);
    setOcrProgress(0);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.text && data.text.trim().length > 50) { 
        setResume(data.text);
      } else {
        console.log("No text found in PDF. Triggering OCR...");
        const ocrText = await performOcr(file);
        if (ocrText.trim()) {
          setResume(ocrText);
        } else {
          alert("Could not extract text. The image might be too blurry.");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error parsing PDF.");
    } finally {
      setIsParsingPdf(false);
      setOcrProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {isParsingPdf ? (ocrProgress > 0 ? `OCR: ${ocrProgress}%` : "Extracting...") : "Upload PDF"}
              </label>
            </div>
          </div>
          <textarea
            required
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            disabled={isParsingPdf}
            placeholder={isParsingPdf ? "Scanning image-based PDF... please wait." : "Paste your current resume text here, or upload a PDF..."}
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
