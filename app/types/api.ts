// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
  requestId?: string
}

export interface GenerateIdeaRequest {
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced'
  techFocus: 'Web' | 'Backend' | 'Frontend' | 'Mobile' | 'Full Stack' | 'DevOps'
  domain: string
}

export interface GenerateIdeaResponse extends ApiResponse<{
  idea: string
}> {}

export interface AnalyzeProjectRequest {
  projectDescription: string
}

export interface AnalyzeProjectResponse extends ApiResponse<{
  analysis: string
}> {}

export interface GenerateRoadmapRequest {
  projectDescription: string
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface GenerateRoadmapResponse extends ApiResponse<{
  roadmap: string
}> {}

export interface ApiError {
  error: string
  status: number
  details?: Record<string, unknown>
}
