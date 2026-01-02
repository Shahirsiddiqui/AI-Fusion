'use client'

import { useState } from 'react'
import { Input, Button, Card } from '../components/ui'
import { AnalysisDisplay } from '../components/features'
import { Brain, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react'

export default function AnalyzerPage() {
  const [projectDescription, setProjectDescription] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!projectDescription || projectDescription.length < 20) {
      setError('Please provide a more detailed description (at least 20 characters)')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectDescription })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze idea')
      }

      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeNew = () => {
    setAnalysis('')
    setProjectDescription('')
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-xl mb-4">
            <Brain className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Project Idea Analyzer
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Paste your project idea and get detailed feedback on complexity, feasibility, and portfolio value.
          </p>
        </div>

        {!analysis ? (
          <Card className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Tips */}
              <div className="p-4 bg-background rounded-lg border border-surface-light">
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  What Makes a Good Description
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Describe the problem you're solving and who it's for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>List the core features or functionality you envision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Mention any technologies you're considering</span>
                  </li>
                </ul>
              </div>

              <Input
                label="Your Project Idea"
                value={projectDescription}
                onChange={setProjectDescription}
                type="textarea"
                placeholder="Describe your project idea. What problem does it solve? What features will it have? Who is it for?"
                error={error}
              />

              <Button
                onClick={handleAnalyze}
                loading={loading}
                className="w-full"
              >
                <Brain className="w-5 h-5 mr-2" />
                Analyze My Idea
              </Button>
            </div>
          </Card>
        ) : (
          <AnalysisDisplay
            analysis={analysis}
            onAnalyzeNew={handleAnalyzeNew}
            loading={loading}
          />
        )}

        {/* Examples Section */}
        {!analysis && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-center mb-6">
              Example Descriptions
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <ExampleCard
                title="A task management app"
                description="I want to build a task management app where users can create projects, add tasks with due dates, and organize tasks into categories. Users should be able to collaborate with others on projects. I'm thinking of using React for the frontend and Node.js for the backend."
                onSelect={() => setProjectDescription(description)}
              />
              <ExampleCard
                title="A personal finance tracker"
                description="I'm planning to create a personal finance application that connects to bank APIs, categorizes transactions automatically, and provides visual charts of spending patterns. The app should support multiple accounts and provide budgeting features."
                onSelect={() => setProjectDescription(description)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ExampleCard({
  title,
  description,
  onSelect
}: {
  title: string
  description: string
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="p-4 bg-surface rounded-lg border border-surface-light text-left hover:border-primary hover:bg-surface/80 transition-all w-full"
    >
      <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary line-clamp-2">{description}</p>
    </button>
  )
}
