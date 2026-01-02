import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { skillLevel, techFocus, interestDomain } = body

    if (!skillLevel || !techFocus || !interestDomain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `You are a senior software engineer and technical mentor helping junior developers build portfolio-ready projects.

Generate a practical software project idea suitable for the given parameters:

Skill Level: ${skillLevel}
Tech Focus: ${techFocus}
Interest Domain: ${interestDomain}

Return the response in this exact structure:

## Project Title
[A compelling, descriptive project name]

## Problem Statement
[A clear, real-world problem this project solves. Be specific about the target users and their pain points.]

## Core Features
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]

## Recommended Tech Stack
**Frontend:** [Recommended frontend technologies]
**Backend:** [Recommended backend technologies]
**Database:** [Recommended database]
**Tools & Services:** [Any additional tools, APIs, or services]

## Estimated Difficulty
[Beginner/Intermediate/Advanced - explain why based on the skill level provided]

## Engineering Skills Demonstrated
- [Skill 1]
- [Skill 2]
- [Skill 3]
- [Skill 4]

## Why This Project Stands Out
[2-3 sentences explaining what makes this project valuable for a portfolio and interview discussions]

Remember: Focus on engineering clarity, not motivational language. The project should be realistic, buildable, and demonstrate meaningful skills.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ idea: text })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error generating idea:', errorMessage)
    return NextResponse.json(
      { error: errorMessage || 'Failed to generate project idea' },
      { status: 500 }
    )
  }
}
