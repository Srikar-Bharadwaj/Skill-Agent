"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatAssessment({ jd, resume, onComplete }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Integrity System State
  const [pasteCount, setPasteCount] = useState(0);
  const [fastAnswers, setFastAnswers] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Start the chat by sending the initial context
    const initChat = async () => {
      try {
        const response = await fetch("/api/assess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            action: "init", 
            jd, 
            resume 
          }),
        });
        
        const data = await response.json();
        
        if (data.message) {
          setMessages([{ role: "assistant", content: data.message }]);
        }
      } catch (error) {
        console.error("Failed to init chat", error);
      } finally {
        setIsInitializing(false);
      }
    };
    
    initChat();
  }, [jd, resume]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
      setStartTime(Date.now());
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const lastAiMessage = messages.length > 0 ? messages[messages.length - 1].content : "Initial Question";
      
      // Integrity Check: Response Time
      const responseTime = Date.now() - startTime;
      const minTime = lastAiMessage.length * 30; // Adaptive threshold based on question length
      let updatedFastAnswers = fastAnswers;
      
      if (responseTime < minTime) {
        updatedFastAnswers += 1;
        setFastAnswers(updatedFastAnswers);
      }

      // Save to mini database asynchronously
      fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question: lastAiMessage, 
          userAnswer: input 
        })
      }).catch(err => console.error("Failed to save to DB:", err));

      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "message",
          messages: [...messages, userMessage],
          jd,
          resume
        }),
      });

      const data = await response.json();
      
      if (data.isComplete) {
        onComplete({
          ...data.result,
          integrity: {
            pasteCount,
            fastAnswers: updatedFastAnswers,
            flagged: pasteCount > 0 || updatedFastAnswers >= 2
          }
        });
      } else if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Technical Interview</h2>
        </div>
        <div className="text-sm text-gray-400">
          Turn {Math.floor(messages.length / 2) + 1} of 5
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4 custom-scrollbar">
        {isInitializing ? (
          <div className="flex items-center justify-center h-full text-gray-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            Analyzing your profile...
          </div>
        ) : (
          messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-purple-500/20 text-purple-400" : "bg-primary/20 text-primary"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-purple-500/10 border border-purple-500/20 text-gray-200 rounded-tr-none" 
                  : "bg-black/40 border border-white/5 text-gray-300 rounded-tl-none whitespace-pre-wrap"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
               <Bot className="w-4 h-4" />
             </div>
             <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex gap-1 items-center rounded-tl-none">
               <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
               <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
               <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="relative flex items-center w-full bg-black/50 border border-white/10 rounded-full py-3 px-4 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading || isInitializing}
          placeholder="Type your answer here..."
          className="flex-1 bg-transparent border-none focus:outline-none text-gray-200 placeholder-gray-500 text-sm disabled:opacity-50"
          onPaste={() => setPasteCount(prev => prev + 1)}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || isInitializing}
          className="ml-2 p-2 rounded-full bg-primary text-white hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
