import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { projectDescription } = body

    if (!projectDescription || projectDescription.length < 20) {
      return NextResponse.json(
        { error: 'Please provide a more detailed project description (at least 20 characters)' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `You are a senior software engineer reviewing a junior developer's project idea for portfolio and interview value.

Analyze the following project idea:

"${projectDescription}"

Return the analysis in this exact structure:

## Overall Assessment
[Provide a brief summary of the idea's potential and viability]

## Complexity Assessment
**Level:** [Beginner/Intermediate/Advanced]
**Breakdown:** [Explain the technical complexity and why]

## Strengths
- [Strength 1 - be specific]
- [Strength 2 - be specific]
- [Strength 3 - be specific]

## Weaknesses & Missing Components
- [Weakness 1 - specific recommendation]
- [Weakness 2 - specific recommendation]
- [Weakness 3 - specific recommendation]

## Engineering Improvement Suggestions
1. [Specific technical improvement]
2. [Specific technical improvement]
3. [Specific technical improvement]

## Recommended Tech Stack
[Suggest appropriate technologies based on the project scope]

## Portfolio & Interview Value Score
**Score:** [1-10]
**Rationale:** [Explain the score and what would improve it]

## Interview Questions You Should Be Prepared For
- [Question 1 a recruiter might ask]
- [Question 2 a recruiter might ask]
- [Question 3 a recruiter might ask]

Be honest, constructive, and specific. Focus on actionable feedback rather than generic praise or criticism.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ analysis: text })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error analyzing idea:', errorMessage)
    return NextResponse.json(
      { error: errorMessage || 'Failed to analyze project idea' },
      { status: 500 }
    )
  }
}
