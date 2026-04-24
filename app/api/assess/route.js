import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy-key-for-build",
});

const MAX_TURNS = 4; // User answers 4 times, then we evaluate

const SYSTEM_PROMPT = `You are an expert technical interviewer evaluating a candidate.
Evaluate depth of understanding. Penalize vague answers. 
Ask specific, probing technical questions based on the Job Description and their Resume.
Do not ask generic questions like "tell me about yourself." Ask them to debug hypothetical code or explain complex architecture choices.
Keep your questions concise (1-2 paragraphs max).
Identify weak or incorrect answers during the chat and explain why.`;

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, jd, resume, messages = [] } = body;

    if (action === "init") {
      const initPrompt = `Based on this Job Description:
---
${jd}
---
And this Resume:
---
${resume}
---
Introduce yourself briefly as the AI Interviewer "Catalyst" and ask the FIRST specific technical question to evaluate a core skill required by the JD that the resume claims to have.`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: initPrompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
      });

      return NextResponse.json({ message: completion.choices[0]?.message?.content });
    }

    if (action === "message") {
      const userMessageCount = messages.filter(m => m.role === "user").length;

      // If the user has answered enough questions, generate the final JSON assessment
      if (userMessageCount >= MAX_TURNS) {
        const evaluationPrompt = `The interview is complete. Based on the JD, Resume, and the conversation history, provide a strict JSON evaluation of the candidate.
CRITICAL INSTRUCTION: You MUST heavily penalize the \`overallScore\` (e.g., dropping it to 50-60%) if the candidate gave poor, vague, or incorrect answers during the chat. Do NOT give a high score just because their resume matches the JD. Grade their actual performance in the chat!

Do not output any markdown formatting like \`\`\`json. Output ONLY valid, parsable JSON matching this schema:
{
  "overallScore": number (0-100),
  "summary": "2-3 sentences summarizing their performance",
  "gaps": ["Array of string descriptions of missing knowledge or weak points"],
  "skills": [
    { "name": "Skill Name", "score": number (0-100) }
  ],
  "learningPlan": [
    { "title": "Week 1 Focus", "description": "Specific topics to learn" }
  ],
  "mistakes": [
    {
      "topic": "Python Time Complexity",
      "issue": "User gave vague answer",
      "explanation": "Dictionary lookup is O(1)",
      "resource": "https://react.dev/reference/react/useState"
    }
  ]
}`;

        const completion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Context: JD:\n${jd}\n\nResume:\n${resume}` },
            ...messages,
            { role: "user", content: evaluationPrompt }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.4, // Increased from 0.2 to allow for more variance in scoring
        });

        const rawContent = completion.choices[0]?.message?.content || "{}";
        let parsedResult;
        
        try {
          const cleanedContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
          parsedResult = JSON.parse(cleanedContent);
        } catch (e) {
          console.error("Failed to parse JSON:", rawContent);
          parsedResult = {
            overallScore: 50,
            summary: "Failed to parse API output, but interview completed.",
            gaps: ["Error parsing JSON response"],
            skills: [{ name: "Unknown", score: 0 }],
            learningPlan: [{ title: "Review Error Logs", description: "The AI did not return valid JSON." }]
          };
        }

        return NextResponse.json({ isComplete: true, result: parsedResult });
      }

      // Otherwise, ask the next question
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Context: JD:\n${jd}\n\nResume:\n${resume}` },
          ...messages,
          { role: "system", content: "Acknowledge their answer briefly, then ask the NEXT technical question. Do not end the interview yet." }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
      });

      return NextResponse.json({ message: completion.choices[0]?.message?.content });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
