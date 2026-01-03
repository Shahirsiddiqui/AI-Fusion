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
    const { projectDescription } = body

    // Validation
    const validation = validateRequired(body, ['projectDescription'])
    if (!validation.valid) {
      return createErrorResponse(
        `Missing required fields: ${validation.missingFields.join(', ')}`,
        400
      )
    }

    if (projectDescription.length < 20) {
      return createErrorResponse(
        'Please provide a more detailed project description (at least 20 characters)',
        400
      )
    }

    // Check cache
    const cacheKey = generateCacheKey('analyze', { projectDescription: projectDescription.slice(0, 50) })
    const cachedResult = appCache.get<{ analysis: string }>(cacheKey)
    if (cachedResult) {
      return createSuccessResponse({ analysis: cachedResult.analysis })
    }

    if (!process.env.GEMINI_API_KEY) {
      return createErrorResponse(
        'API configuration error. Please contact support.',
        500
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

    const responseData = { analysis: text }
    appCache.set(cacheKey, responseData)

    return createSuccessResponse(responseData)
  } catch (error) {
    return handleApiError(error)
  }
}
