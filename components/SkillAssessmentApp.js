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

  return (
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
  );
}
