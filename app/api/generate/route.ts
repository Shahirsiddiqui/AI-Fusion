import { GoogleGenerativeAI } from '@google/generative-ai'
import { rateLimiter, getClientIp } from '@/app/lib/rateLimiter'
import { createSuccessResponse, createErrorResponse, handleApiError, validateRequired } from '@/app/lib/apiHandler'
import { appCache, generateCacheKey } from '@/app/lib/cache'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request)
    if (!rateLimiter.isAllowed(clientIp)) {
      const resetTime = rateLimiter.getResetTime(clientIp)
      return createErrorResponse(
        `Rate limit exceeded. Try again in ${resetTime} seconds.`,
        429
      )
    }

    const body = await request.json()
    const { skillLevel, techFocus, interestDomain } = body

    // Validation
    const validation = validateRequired(body, ['skillLevel', 'techFocus', 'interestDomain'])
    if (!validation.valid) {
      return createErrorResponse(
        `Missing required fields: ${validation.missingFields.join(', ')}`,
        400
      )
    }

    // Check cache
    const cacheKey = generateCacheKey('generate', { skillLevel, techFocus, interestDomain })
    const cachedResult = appCache.get<{ idea: string }>(cacheKey)
    if (cachedResult) {
      return createSuccessResponse({ idea: cachedResult.idea })
    }

    if (!process.env.GEMINI_API_KEY) {
      return createErrorResponse(
        'API configuration error. Please contact support.',
        500
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

    const responseData = { idea: text }
    appCache.set(cacheKey, responseData)

    return createSuccessResponse(responseData)
  } catch (error) {
    console.error('Generate API Error Details:', error)
    if (error instanceof Error) {
      console.error('Error Message:', error.message)
      console.error('Error Stack:', error.stack)
    }
    return handleApiError(error)
  }
}
