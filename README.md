This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Catalyst: AI-Powered Skill Assessment Agent

**🚀 Live Demo:** [https://skill-agent-production.up.railway.app/](https://skill-agent-production.up.railway.app/)

## 🧩 Top-Tier Features

### 🧠 Integrity System
Implemented a behavior-aware integrity monitoring system that evaluates user interaction patterns, including paste events and adaptive response latency, to flag potentially assisted responses.

### 🧠 Confidence & Depth Analysis
Introduced AI-driven confidence scoring and depth analysis to assess not just correctness but conceptual understanding during the interview.

### 🧠 Explainable Mistakes
Enabled explainable feedback by generating corrected responses and reasoning, transforming the system into an interactive learning assistant.

### 🧠 Context-Aware UI
Designed a state-aware UI that dynamically adapts visual feedback based on system state, enhancing engagement during assessments.

### 🧠 ATS Scan & Resume Upload
Evaluates resumes against job descriptions using LLM-based semantic matching. Supports direct PDF uploads with client-side to serverless text extraction.

### 🧠 Pre-Interview Revision Mode
Built a lightweight revision system that surfaces previously asked questions and weak areas, enabling targeted pre-interview preparation.

## 🎯 Demo Script Guide

When demoing this project, follow this narrative for maximum impact:
1. "We start with ATS analysis, supporting direct PDF uploads."
2. "Then we conduct adaptive questioning based on the ATS results."
3. "We don't just evaluate correctness — we evaluate depth and confidence."
4. "We also track behavioral integrity signals like paste events and response latency."
5. "Finally, we generate explainable feedback and a targeted learning roadmap."

## Overview

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
