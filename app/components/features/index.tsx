'use client'

import { useState } from 'react'
import { Card, Button, Badge, Skeleton } from '../ui'
import { Copy, RefreshCw, Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface IdeaDisplayProps {
  idea: string
  onGenerateNew: () => void
  onGenerateRoadmap: () => void
  loading?: boolean
}

export function IdeaDisplay({ idea, onGenerateNew, onGenerateRoadmap, loading }: IdeaDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(idea)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return <IdeaDisplaySkeleton />
  }

  return (
    <div className="space-y-6">
      <Card className="bg-background/50">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-text-primary mt-6 mb-4 pb-2 border-b border-surface-light">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium text-text-primary mt-5 mb-3">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 my-4 pl-6 list-disc text-text-secondary">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-text-secondary">
                  {children}
                </li>
              ),
              p: ({ children }) => (
                <p className="text-text-secondary my-3 leading-relaxed">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-primary font-semibold">
                  {children}
                </strong>
              ),
            }}
          >
            {idea}
          </ReactMarkdown>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="secondary"
            className="flex-1 sm:flex-none"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            onClick={onGenerateNew}
            variant="secondary"
            className="flex-1 sm:flex-none"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New
          </Button>
        </div>
        <Button
          onClick={onGenerateRoadmap}
          className="flex-1 sm:flex-none"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Generate Roadmap
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function IdeaDisplaySkeleton() {
  return (
    <div className="space-y-6">
      <Card className="bg-background/50">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Card>
      <div className="flex gap-4">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  )
}

interface AnalysisDisplayProps {
  analysis: string
  onAnalyzeNew: () => void
  loading?: boolean
}

export function AnalysisDisplay({ analysis, onAnalyzeNew, loading }: AnalysisDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(analysis)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return <AnalysisDisplaySkeleton />
  }

  return (
    <div className="space-y-6">
      <Card className="bg-background/50">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-text-primary mt-6 mb-4 pb-2 border-b border-surface-light">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium text-text-primary mt-5 mb-3">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 my-4 pl-6 list-disc text-text-secondary">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-text-secondary">
                  {children}
                </li>
              ),
              p: ({ children }) => (
                <p className="text-text-secondary my-3 leading-relaxed">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-accent font-semibold">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="text-text-secondary">
                  {children}
                </em>
              ),
            }}
          >
            {analysis}
          </ReactMarkdown>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="secondary"
            className="flex-1 sm:flex-none"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            onClick={onAnalyzeNew}
            variant="secondary"
            className="flex-1 sm:flex-none"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Analyze New
          </Button>
        </div>
      </div>
    </div>
  )
}

function AnalysisDisplaySkeleton() {
  return (
    <div className="space-y-6">
      <Card className="bg-background/50">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Card>
      <div className="flex gap-4">
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  )
}
