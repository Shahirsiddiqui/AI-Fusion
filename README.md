## AI Fusion

## Product Overview

AI Fusion is a web-based AI platform designed to help new and early-stage developers generate strong software project ideas and analyze their own ideas using real software engineering principles.

The product combines a friendly mentor tone with serious engineering depth, positioning HashLink Corp as a capable AI-first software agency.

---

## Product Goals

* Help developers move from confusion to clarity
* Provide buildable, portfolio-ready project ideas
* Teach engineering thinking, not just inspiration
* Serve as a high-quality agency showcase product

---

## Target Users

* Beginner to intermediate developers
* Computer science students
* Self-taught developers
* Junior developers preparing portfolios or interviews

---

## Core User Problems

* Unsure what project to build
* Difficulty judging idea complexity
* Weak project explanations in interviews
* Lack of structured build guidance

---

## Core Features (MVP)

### 1. AI Project Idea Generator

**User Inputs**

* Skill level (Beginner / Intermediate / Advanced)
* Tech focus (Web, Backend, AI, Mobile)
* Interest domain (Health, Finance, Productivity, etc.)

**AI Outputs**

* Project title
* Real-world problem statement
* Core feature list
* Recommended tech stack
* Difficulty level
* Engineering skills demonstrated

---

### 2. Project Idea Analyzer

**User Input**

* Free-text project idea description

**AI Analysis Output**

* Complexity assessment
* Feasibility for skill level
* Missing or weak components
* Engineering improvement suggestions
* Resume and interview value score (1–10)

---

### 3. Build Roadmap Generator

**Generated Output**

* Step-by-step build phases
* Concepts to learn at each phase
* Tools and libraries required
* Suggested implementation order

---

## Product Flow

### Landing Page

* Clear headline and value proposition
* Primary CTA: Generate Idea
* Secondary CTA: Analyze My Idea

---

### Path A: Generate Project Idea

1. User selects skill level, tech focus, and domain
2. Clicks Generate
3. AI returns structured project idea
4. User can save, regenerate, or view roadmap

---

### Path B: Analyze Project Idea

1. User pastes project description
2. Clicks Analyze
3. AI returns detailed evaluation
4. User can improve idea or generate roadmap

---

### Roadmap View

* Vertical phase-based layout
* Clear milestones
* Learning objectives per phase

---

## AI Prompt Design

### Prompt 1: Project Idea Generator

**System Role**  
You are a senior software engineer and technical mentor helping junior developers build portfolio-ready projects.

**Prompt Instructions**  
Generate a practical software project idea suitable for the given skill level.  
The idea must be realistic, buildable, and valuable for a developer portfolio.

Return the response in this structure:

* Project title
* Problem statement
* Core features
* Recommended tech stack
* Estimated difficulty
* Engineering skills demonstrated

Avoid vague or motivational language. Focus on engineering clarity.

---

### Prompt 2: Project Idea Analyzer

**System Role**  
You are a senior software engineer reviewing a junior developer’s project idea.

**Prompt Instructions**  
Analyze the following project idea and evaluate:

* Technical complexity
* Feasibility for stated skill level
* Missing or weak components
* Engineering improvement suggestions
* Portfolio and interview value score (1–10)

Be honest, constructive, and specific.

---

### Prompt 3: Build Roadmap Generator

**System Role**  
You are a technical lead creating a build plan for a software project.

**Prompt Instructions**  
Create a step-by-step roadmap including:

* Logical build order
* Concepts to learn at each stage
* Tools and libraries required
* Clear milestones

Keep the roadmap practical and developer-focused.

---

## UX & Tone Guidelines

* Clean, modern, developer-focused UI
* Friendly mentor tone with engineering depth
* Structured outputs with clear headings
* No motivational fluff

---

## Pages (Web Only)

* Landing Page
* Idea Generator
* Idea Analyzer
* Roadmap View
* About / How It Works

---

## Tech Stack

* Frontend: Next.js
* Styling: Tailwind CSS
* Backend: API Routes
* AI: OpenAI or DeepSeek
* Deployment: Vercel



