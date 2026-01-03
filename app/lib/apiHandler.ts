import { NextResponse } from 'next/server'
import { ApiResponse, ApiError } from '@/app/types/api'

/**
 * Create a standardized API success response
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

/**
 * Create a standardized API error response
 */
export function createErrorResponse(
  error: string,
  status: number = 400,
  details?: Record<string, unknown>
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      error,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

/**
 * Handle API errors with consistent formatting
 */
export function handleApiError(error: unknown): NextResponse<ApiResponse<null>> {
  console.error('API Error:', error)

  if (error instanceof Error) {
    // Check for common error types
    if (error.message.includes('API key')) {
      return createErrorResponse(
        'API configuration error. Please contact support.',
        500
      )
    }

    if (error.message.includes('rate limit')) {
      return createErrorResponse(
        'Too many requests. Please try again later.',
        429
      )
    }

    return createErrorResponse(error.message, 500)
  }

  return createErrorResponse('An unexpected error occurred', 500)
}

/**
 * Validate required fields in request body
 */
export function validateRequired(
  body: Record<string, unknown>,
  requiredFields: string[]
): { valid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter((field) => !body[field])

  return {
    valid: missingFields.length === 0,
    missingFields,
  }
}
