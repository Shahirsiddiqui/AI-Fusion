'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorState {
  hasError: boolean
  error: Error | null
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [error, setError] = useState<ErrorState>({ hasError: false, error: null })

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError({ hasError: true, error: event.error })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setError({ hasError: true, error: new Error(event.reason) })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  if (error.hasError) {
    return (
      fallback || (
        <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                Something went wrong
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                {error.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => setError({ hasError: false, error: null })}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Dismiss
              </button>
            </div>
            <button
              onClick={() => setError({ hasError: false, error: null })}
              className="text-red-600 hover:text-red-700 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
