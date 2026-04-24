"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UploadSection from "./UploadSection";
import AtsScanner from "./AtsScanner";
import ChatAssessment from "./ChatAssessment";
import ResultsDashboard from "./ResultsDashboard";

export default function SkillAssessmentApp() {
  const [step, setStep] = useState("upload");
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");
  const [assessmentResult, setAssessmentResult] = useState(null);

  const handleStartAssessment = (jdText, resumeText) => {
    setJd(jdText);
    setResume(resumeText);
    setStep("ats");
  };

  const handleProceedToChat = () => {
    setStep("chat");
  };

  const handleAssessmentComplete = (resultJson) => {
    setAssessmentResult(resultJson);
    setStep("results");
  };

  const resetApp = () => {
    setJd("");
    setResume("");
    setAssessmentResult(null);
    setStep("upload");
  };

  const getContextColor = () => {
    switch(step) {
      case "chat": return "bg-blue-500/20";
      case "results": return "bg-green-500/20";
      default: return "bg-primary/20"; // upload, ats
    }
  };
  const getContextColor2 = () => {
    switch(step) {
      case "chat": return "bg-indigo-500/20";
      case "results": return "bg-emerald-500/20";
      default: return "bg-purple-500/20";
    }
  };

  return (
    <>
      {/* Context-Aware UI Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none transition-colors duration-1000">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] orb transition-colors duration-1000 ${getContextColor()}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] orb transition-colors duration-1000 ${getContextColor2()}`} style={{ animationDelay: "-3s" }} />
      </div>

      <div className="relative min-h-[500px] glass-panel rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <UploadSection onStart={handleStartAssessment} />
          </motion.div>
        )}

        {step === "ats" && (
          <motion.div
            key="ats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AtsScanner jd={jd} resume={resume} onProceed={handleProceedToChat} />
          </motion.div>
        )}
        
        {step === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatAssessment 
              jd={jd} 
              resume={resume} 
              onComplete={handleAssessmentComplete} 
            />
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsDashboard result={assessmentResult} onReset={resetApp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
