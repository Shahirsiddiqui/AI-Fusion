'use client'

import { useState } from 'react'
import { Card, Button, Skeleton } from '../ui'
import { Copy, RefreshCw, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface RoadmapDisplayProps {
  roadmap: string
  onGenerateNew: () => void
  loading?: boolean
}

interface Phase {
  title: string
  content: string
}

export function RoadmapDisplay({ roadmap, onGenerateNew, loading }: RoadmapDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([0, 1, 2, 3]))

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roadmap)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const togglePhase = (index: number) => {
    const newExpanded = new Set(expandedPhases)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedPhases(newExpanded)
  }

  if (loading) {
    return <RoadmapDisplaySkeleton />
  }

  // Parse roadmap into phases
  const phases = parseRoadmap(roadmap)

  return (
    <div className="space-y-6">
      {/* Phase Cards */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <PhaseCard
            key={index}
            phase={phase}
            index={index}
            isExpanded={expandedPhases.has(index)}
            onToggle={() => togglePhase(index)}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-surface-light">
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
          Generate New Roadmap
        </Button>
      </div>
    </div>
  )
}

function PhaseCard({
  phase,
  index,
  isExpanded,
  onToggle
}: {
  phase: Phase
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const colors = [
    'border-l-primary',
    'border-l-accent',
    'border-l-purple-500',
    'border-l-yellow-500'
  ]

  return (
    <Card className={`bg-background/50 border-l-4 ${colors[index % colors.length]} overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            index === 0 ? 'bg-primary/20 text-primary' :
            index === 1 ? 'bg-accent/20 text-accent' :
            index === 2 ? 'bg-purple-500/20 text-purple-500' :
            'bg-yellow-500/20 text-yellow-500'
          }`}>
            {index + 1}
          </div>
          <h3 className="text-lg font-semibold text-text-primary">{phase.title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-text-secondary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 ml-14">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h4: ({ children }) => (
                  <h4 className="text-md font-medium text-text-primary mt-4 mb-2">
                    {children}
                  </h4>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-1 my-3 pl-5 list-disc text-text-secondary text-sm">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-text-secondary text-sm">
                    {children}
                  </li>
                ),
                p: ({ children }) => (
                  <p className="text-text-secondary my-2 text-sm leading-relaxed">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-accent font-semibold">
                    {children}
                  </strong>
                ),
              }}
            >
              {phase.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </Card>
  )
}

function parseRoadmap(roadmap: string): Phase[] {
  const phases: Phase[] = []
  const lines = roadmap.split('\n')

  let currentPhase: Phase | null = null
  let currentContent: string[] = []

  for (const line of lines) {
    // Match phase headers like "## Phase 1: Foundation"
    const phaseMatch = line.match(/^##\s+(Phase\s+\d+[:\w]*|Build\s+Overview)/i)
    if (phaseMatch) {
      if (currentPhase) {
        phases.push({
          ...currentPhase,
          content: currentContent.join('\n')
        })
      }
      currentPhase = {
        title: phaseMatch[1].trim(),
        content: ''
      }
      currentContent = []
    } else if (currentPhase && line.trim()) {
      currentContent.push(line)
    }
  }

  // Push the last phase
  if (currentPhase) {
    phases.push({
      ...currentPhase,
      content: currentContent.join('\n')
    })
  }

  // If no phases found, return the whole text as one phase
  if (phases.length === 0 && roadmap) {
    phases.push({
      title: 'Project Roadmap',
      content: roadmap
    })
  }

  return phases
}

function RoadmapDisplaySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="bg-background/50">
          <div className="flex items-center gap-4 p-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="px-4 pb-4 ml-14 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </Card>
      ))}
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-48" />
      </div>
    </div>
  )
}

interface ChecklistProps {
  items: string[]
}

export function Checklist({ items }: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedItems(newChecked)
  }

  return (
    <ul className="space-y-2 my-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <button
            onClick={() => toggleItem(index)}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              checkedItems.has(index)
                ? 'bg-accent border-accent'
                : 'border-surface-light hover:border-primary'
            }`}
          >
            {checkedItems.has(index) && (
              <CheckCircle className="w-3 h-3 text-white" />
            )}
          </button>
          <span className={`text-sm ${
            checkedItems.has(index)
              ? 'text-text-secondary line-through'
              : 'text-text-secondary'
          }`}>
            {item.replace(/^- \[\s*\]\s*/, '')}
          </span>
        </li>
      ))}
    </ul>
  )
}
