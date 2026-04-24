"use client";

import { motion } from "framer-motion";
import { Award, Target, BookOpen, AlertTriangle, RotateCcw } from "lucide-react";

export default function ResultsDashboard({ result, onReset }) {
  if (!result) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Assessment Complete</h2>
        <p className="text-gray-400 text-sm">Here is your gap analysis and learning plan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score & Summary */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-white">Overall Match</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-gradient">{result.overallScore || 0}%</span>
            <span className="text-gray-400 text-sm mb-1">fit for the role</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mt-4">
            {result.summary || "Based on the assessment, you show a foundational understanding but have specific areas to improve."}
          </p>
        </div>

        {/* Skill Gaps */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-white">Critical Gaps</h3>
          </div>
          <ul className="space-y-3">
            {result.gaps?.map((gap, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-gray-300">
                <span className="text-purple-500">•</span>
                {gap}
              </li>
            ))}
            {(!result.gaps || result.gaps.length === 0) && (
              <li className="text-sm text-gray-500">No critical gaps identified!</li>
            )}
          </ul>
        </div>
      </div>

      {/* Mistake-Based Learning */}
      {result.mistakes && result.mistakes.length > 0 && (
        <div className="bg-black/40 border border-red-500/20 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-white">Interview Mistakes & Feedback</h3>
          </div>
          <div className="space-y-4">
            {result.mistakes.map((mistake, idx) => (
              <div key={idx} className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-200 mb-1">{mistake.topic}</h4>
                <p className="text-sm text-red-300/80 mb-2 font-medium">Issue: {mistake.issue}</p>
                <p className="text-sm text-gray-400 mb-3">{mistake.explanation}</p>
                {mistake.resource && (
                  <a href={mistake.resource} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                    Study Resource <RotateCcw className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Bar Chart */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3 text-green-400 mb-4">
          <Target className="w-5 h-5" />
          <h3 className="font-semibold text-lg text-white">Skill Analysis</h3>
        </div>
        <div className="space-y-5">
          {result.skills?.map((skill, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-200">{skill.name}</span>
                <span className="text-gray-400">{skill.score}/100</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.score}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Plan */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3 text-blue-400 mb-4">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-semibold text-lg text-white">Learning Plan</h3>
        </div>
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {result.learningPlan?.map((step, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-black text-gray-400 group-hover:text-primary group-hover:border-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm transition-colors z-10">
                <span className="text-xs font-bold">{idx + 1}</span>
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-white/5 bg-black/40 text-sm hover:border-primary/30 transition-colors">
                <h4 className="font-semibold text-gray-200 mb-1">{step.title}</h4>
                <p className="text-gray-400 text-xs">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Start New Assessment
        </button>
      </div>
    </div>
  );
}
