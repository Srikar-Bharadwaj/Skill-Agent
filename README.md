# 🚀 Catalyst — AI-Powered Skill Assessment Agent

Catalyst is an intelligent, behavior-aware skill assessment platform that evaluates a candidate’s real-world capabilities against a job description using adaptive questioning, integrity analysis, and explainable feedback.

📦 **GitHub:** https://github.com/Srikar-Bharadwaj/Skill-Agent

---

## 🎯 Problem

Traditional hiring systems rely on:
- Resume keyword matching (ATS)
- Static quizzes or MCQs
- Surface-level interviews

These approaches fail to measure:
- Depth of understanding  
- Real problem-solving ability  
- Practical interview readiness  

---

## 💡 Solution

Catalyst simulates a **real technical interviewer** and evaluates candidates across multiple dimensions:

1. Resume vs Job Description analysis  
2. Adaptive, multi-turn technical interview  
3. Behavioral integrity monitoring  
4. Depth + confidence evaluation  
5. Explainable feedback with learning roadmap  

> **“We don’t just evaluate answers — we evaluate thinking.”**

---

## 🔥 Key Features

### 🧠 AI-Powered Adaptive Interview
- Dynamic question generation based on candidate responses  
- Focuses on weak areas  
- Simulates real interview flow  

---

### 📊 ATS Resume Scanner & Enhancer
- Generates ATS score (0–100)  
- Detects missing keywords  
- Suggests actionable resume improvements  

---

### ⚖️ Behavioral Integrity System
Tracks suspicious patterns during assessment:
- Paste detection  
- Response latency analysis  
- Fast-answer detection  

> Flags potential assisted responses using behavioral signals  

---

### 🎯 Confidence & Depth Evaluation
- **Confidence Score (0–100)**  
- **Depth Rating** (Superficial → Moderate → Deep)  

Evaluates *how well* a candidate understands concepts—not just correctness  

---

### 📚 Explainable Mistake Analysis
For every weak or incorrect answer:
- What went wrong  
- Correct version of the answer  
- Conceptual explanation  
- Learning resource suggestions  

---

### 📈 Skill Gap Visualization
- Match / Partial / Gap classification  
- Visual progress indicators  
- Clear hiring readiness insight  

---

### 🗂️ Revision Notes System
- Stores previously asked questions  
- Tracks weak topics  
- Helps in pre-interview revision  

---

### 🎨 Context-Aware Interactive UI
Dynamic interface that responds to system state:
- 💬 Chat Mode → Blue  
- ⏳ Processing → Purple  
- ✅ Results → Green  

---

## 🧱 System Architecture
User Input (Resume + JD)
        ↓
ATS Analysis Engine
        ↓
Adaptive Interview Engine
        ↓
Evaluation Engine (Confidence + Integrity)
        ↓
Structured JSON Output
        ↓
Results Dashboard


---

## ⚙️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion

### Backend
- Next.js API Routes
- Node.js

### AI Models
- Groq (LLaMA3) / OpenAI / Anthropic

### Storage
- Lightweight JSON-based persistence (Notes system)

### Deployment
- Railway

---

## 🔍 How It Works

### Step 1: Input
- User provides Resume and Job Description  

---

### Step 2: ATS Analysis
- Computes ATS score  
- Identifies missing skills  

---

### Step 3: Technical Interview
- AI asks 3–5 adaptive questions  
- Tracks:
  - responses  
  - timing  
  - behavioral signals  

---

### Step 4: Evaluation
System analyzes:
- Skill gaps  
- Confidence level  
- Depth of understanding  
- Integrity signals  

---

### Step 5: Results Dashboard
- Final verdict (Ready / Not Ready)  
- Skill visualization  
- Mistake explanations  
- Personalized learning roadmap  
- Revision notes  

---

## 🚀 Why Catalyst Stands Out

- 🔥 Goes beyond ATS → evaluates real skills  
- 🔥 Explainable feedback → not just scores  
- 🔥 Behavioral integrity analysis  
- 🔥 Adaptive interview simulation  
- 🔥 Complete end-to-end system  

---

## 📊 Evaluation Criteria Alignment

|    Criteria       |     Implementation          |   
|-------------------|-----------------------------|
| End-to-End System | Full working pipeline       |
| Core AI Agent     | Adaptive questioning        |
| Output Quality    | Structured + visual         |
| Innovation        | Integrity + explainability  |
| UX                | Multi-step interactive flow |
| Code Quality      | Modular architecture        |

---

## ⚠️ Limitations

- Behavioral integrity signals are heuristic-based  
- LLM responses may vary slightly  
- No real-time proctoring (camera/audio)  
- Depends on external API reliability  

---

## 🔮 Future Enhancements

### 🧠 Advanced AI Evaluation
- Fine-tuned domain-specific models  
- Multi-role interview simulations  

### 🎥 Real-Time Proctoring
- Webcam monitoring  
- Voice authenticity detection  
- Attention tracking  

### 📊 Analytics Dashboard
- Performance history  
- Skill progression tracking  

### 🗃️ Scalable Backend
- PostgreSQL / MongoDB  
- User authentication  

### 🤖 Resume Intelligence
- AI resume rewriting  
- Keyword optimization  

### 🧪 Advanced Integrity Detection
- ML-based cheating detection  
- Behavioral learning  

### 🌐 Enterprise Integration
- ATS integrations  
- HR APIs  
- Bulk candidate evaluation  

--- 

## 🧠 Final Insight

Catalyst transforms hiring from **static evaluation** to **dynamic skill assessment**.

It bridges the gap between:
- Resume claims  
- Actual capability  

By combining:
- adaptive questioning  
- behavioral analysis  
- explainable feedback  

Catalyst provides a **holistic and realistic evaluation of candidate readiness**.

---

## 🛠️ Run Locally
git clone https://github.com/Srikar-Bharadwaj/Skill-Agent
cd Skill-Agent
npm install
npm run dev

