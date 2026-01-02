'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input, Button, Card } from '../components/ui'
import { RoadmapDisplay } from '../components/features/RoadmapDisplay'
import { MapPin, Sparkles } from 'lucide-react'

export default function RoadmapPage() {
  const searchParams = useSearchParams()
  const initialIdea = searchParams.get('idea') || ''

  const [projectIdea, setProjectIdea] = useState(initialIdea)
  const [skillLevel, setSkillLevel] = useState('intermediate')
  const [roadmap, setRoadmap] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!projectIdea || projectIdea.length < 20) {
      setError('Please provide a valid project idea (at least 20 characters)')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectIdea, skillLevel })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate roadmap')
      }

      setRoadmap(data.roadmap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateNew = () => {
    setRoadmap('')
  }

  // Auto-generate if idea was passed from generator
  useEffect(() => {
    if (initialIdea && !roadmap) {
      handleGenerate()
    }
  }, [initialIdea, roadmap, projectIdea, skillLevel])

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-xl mb-4">
            <MapPin className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Build Roadmap Generator
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Turn your project idea into a step-by-step implementation plan with learning objectives and milestones.
          </p>
        </div>

        {!roadmap ? (
          <Card className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <Input
                label="Your Project Idea"
                value={projectIdea}
                onChange={setProjectIdea}
                type="textarea"
                placeholder="Paste your project idea here. What are you building?"
                helperText={projectIdea.length > 0 ? `${projectIdea.length} characters` : ''}
                error={error}
              />

              <Input
                label="Your Skill Level"
                value={skillLevel}
                onChange={setSkillLevel}
                type="select"
                options={[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' }
                ]}
              />

              <Button
                onClick={handleGenerate}
                loading={loading}
                className="w-full"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Generate Roadmap
              </Button>
            </div>
          </Card>
        ) : (
          <RoadmapDisplay
            roadmap={roadmap}
            onGenerateNew={handleGenerateNew}
            loading={loading}
          />
        )}

        {/* Tips Section */}
        {!roadmap && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-center mb-6">
              What You'll Get
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <TipCard
                icon="1"
                title="Phase-by-Phase Plan"
                description="Structured breakdown from foundation to deployment, with clear milestones."
              />
              <TipCard
                icon="2"
                title="Learning Objectives"
                description="Specific concepts and technologies to learn at each stage of development."
              />
              <TipCard
                icon="3"
                title="Acceptance Criteria"
                description="Clear definitions of done so you know exactly when each phase is complete."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TipCard({
  icon,
  title,
  description
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <Card className="text-center">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-primary font-bold">{icon}</span>
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </Card>
  )
}
