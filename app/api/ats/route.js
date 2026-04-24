import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy-key-for-build",
});

export async function POST(req) {
  try {
    const { jd, resume } = await req.json();

    const prompt = `Compare the following Resume with the Job Description.
Do not do complex parsing, just evaluate the raw text semantic match.
Return a strict JSON output exactly matching this schema:
{
  "atsScore": number (0-100),
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["improvement suggestion 1", "improvement suggestion 2"]
}

Job Description:
${jd}

Resume:
${resume}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
    });

    const rawContent = completion.choices[0]?.message?.content || "{}";
    let parsedResult;
    try {
      const cleanedContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedResult = JSON.parse(cleanedContent);
    } catch (e) {
      console.error("Failed to parse ATS JSON:", rawContent);
      parsedResult = {
        atsScore: 50,
        missingKeywords: ["Error parsing keywords"],
        suggestions: ["Could not parse ATS response. Please proceed to interview."]
      };
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("ATS API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
