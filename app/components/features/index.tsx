'use client'

import { useState } from 'react'
import { Card, Button, Badge, Skeleton } from '../ui'
import { Copy, RefreshCw, Sparkles, MapPin, CheckCircle, ArrowRight, Download, Share2 } from 'lucide-react'
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

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([idea], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'project-idea.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return <IdeaDisplaySkeleton />
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Success Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent/20 border border-accent/50 rounded-full">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span className="text-accent font-semibold">Project Idea Ready</span>
        </div>
      </div>

      {/* Enhanced Card with Better Presentation */}
      <Card className="bg-gradient-to-br from-surface/50 to-background/50 border-primary/20 backdrop-blur-sm">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-primary mt-8 mb-4 pb-3 border-b border-primary/30 flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold text-text-primary mt-6 mb-3 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-accent" />
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="space-y-3 my-4 pl-6 list-none text-text-secondary">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-text-secondary flex items-start gap-3 pl-0">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>{children}</span>
                </li>
              ),
              p: ({ children }) => (
                <p className="text-text-secondary my-4 leading-relaxed text-base">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-primary font-bold">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="bg-background/50 text-accent px-2 py-1 rounded font-mono text-sm">
                  {children}
                </code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-text-secondary">
                  {children}
                </blockquote>
              ),
            }}
          >
            {idea}
          </ReactMarkdown>
        </div>
      </Card>

      {/* Enhanced Action Buttons */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Button
          onClick={handleCopy}
          variant="secondary"
          className="flex items-center justify-center gap-2 py-3 border-2 border-surface-light hover:border-primary/50 hover:bg-surface/80"
        >
          <Copy className="w-5 h-5" />
          <span className="font-semibold">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
        
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="flex items-center justify-center gap-2 py-3 border-2 border-surface-light hover:border-primary/50 hover:bg-surface/80"
        >
          <Download className="w-5 h-5" />
          <span className="font-semibold">Download</span>
        </Button>

        <Button
          onClick={onGenerateNew}
          variant="secondary"
          className="flex items-center justify-center gap-2 py-3 border-2 border-surface-light hover:border-primary/50 hover:bg-surface/80"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="font-semibold">Generate New</span>
        </Button>

        <Button
          onClick={onGenerateRoadmap}
          className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/50"
        >
          <MapPin className="w-5 h-5" />
          <span>Build Roadmap</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Next Steps Card */}
      <Card className="bg-accent/10 border-2 border-accent/30 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-accent/20 rounded-lg">
            <MapPin className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary mb-2">Next Step: Build Your Roadmap</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Click "Build Roadmap" to generate a detailed, phase-by-phase implementation plan with learning objectives and milestones tailored to your project.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function IdeaDisplaySkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <Skeleton className="h-10 w-48 mx-auto" />
      </div>
      <Card className="bg-gradient-to-br from-surface/50 to-background/50">
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>
          <Skeleton className="h-40 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        </div>
      </Card>
      <div className="grid sm:grid-cols-2 gap-4">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
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
