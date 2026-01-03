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
    const { projectIdea, skillLevel } = body

    // Validation
    const validation = validateRequired(body, ['projectIdea'])
    if (!validation.valid) {
      return createErrorResponse(
        `Missing required fields: ${validation.missingFields.join(', ')}`,
        400
      )
    }

    if (projectIdea.length < 20) {
      return createErrorResponse(
        'Please provide a valid project idea to generate a roadmap (at least 20 characters)',
        400
      )
    }

    // Check cache
    const cacheKey = generateCacheKey('roadmap', { projectIdea: projectIdea.slice(0, 50), skillLevel: skillLevel || 'Intermediate' })
    const cachedResult = appCache.get<{ roadmap: string }>(cacheKey)
    if (cachedResult) {
      return createSuccessResponse({ roadmap: cachedResult.roadmap })
    }

    if (!process.env.GEMINI_API_KEY) {
      return createErrorResponse(
        'API configuration error. Please contact support.',
        500
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `You are a technical lead creating a detailed build plan for a software project.

Create a step-by-step roadmap for building this project:

Project: "${projectIdea}"
Skill Level: ${skillLevel || 'Intermediate'}

Return the roadmap in this exact structure:

## Build Overview
[Brief overview of the project and estimated timeline]

## Phase 1: Foundation
**Goal:** [What to accomplish in this phase]
**Duration:** [Estimated time]

### Tasks
- [Specific task 1]
- [Specific task 2]
- [Specific task 3]

### Concepts to Learn
- [Concept 1] - [Brief explanation and why it matters]
- [Concept 2] - [Brief explanation and why it matters]

### Tools & Libraries
- [Tool 1] - [What it's for]
- [Tool 2] - [What it's for]

### Acceptance Criteria
- [ ] [ ] [Criterion 1]
- [ ] [ ] [Criterion 2]
- [ ] [ ] [Criterion 3]

---

## Phase 2: Core Features
**Goal:** [What to accomplish in this phase]
**Duration:** [Estimated time]

### Tasks
- [Specific task 1]
- [Specific task 2]
- [Specific task 3]

### Concepts to Learn
- [Concept 1] - [Brief explanation and why it matters]
- [Concept 2] - [Brief explanation and why it matters]

### Tools & Libraries
- [Tool 1] - [What it's for]
- [Tool 2] - [What it's for]

### Acceptance Criteria
- [ ] [ ] [Criterion 1]
- [ ] [ ] [Criterion 2]
- [ ] [ ] [Criterion 3]

---

## Phase 3: Polish & Testing
**Goal:** [What to accomplish in this phase]
**Duration:** [Estimated time]

### Tasks
- [Specific task 1]
- [Specific task 2]
- [Specific task 3]

### Concepts to Learn
- [Concept 1] - [Brief explanation and why it matters]
- [Concept 2] - [Brief explanation and why it matters]

### Tools & Libraries
- [Tool 1] - [What it's for]
- [Tool 2] - [What it's for]

### Acceptance Criteria
- [ ] [ ] [Criterion 1]
- [ ] [ ] [Criterion 2]
- [ ] [ ] [Criterion 3]

---

## Phase 4: Deployment & Launch
**Goal:** [What to accomplish in this phase]
**Duration:** [Estimated time]

### Tasks
- [Specific task 1]
- [Specific task 2]
- [Specific task 3]

### Concepts to Learn
- [Concept 1] - [Brief explanation and why it matters]
- [Concept 2] - [Brief explanation and why it matters]

### Tools & Libraries
- [Tool 1] - [What it's for]
- [Tool 2] - [What it's for]

### Acceptance Criteria
- [ ] [ ] [Criterion 1]
- [ ] [ ] [Criterion 2]
- [ ] [ ] [Criterion 3]

---

## Resources & References
### Documentation
- [Link/Resource 1]
- [Link/Resource 2]
- [Link/Resource 3]

### Learning Paths
- [Path 1]
- [Path 2]

### Common Pitfalls to Avoid
- [Pitfall 1] - [How to avoid it]
- [Pitfall 2] - [How to avoid it]

Keep the roadmap practical, developer-focused, and tailored to the specified skill level. Use appropriate technical depth based on whether the developer is a beginner, intermediate, or advanced level.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const responseData = { roadmap: text }
    appCache.set(cacheKey, responseData)

    return createSuccessResponse(responseData)
  } catch (error) {
    return handleApiError(error)
  }
}
