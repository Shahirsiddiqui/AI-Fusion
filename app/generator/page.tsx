'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button, Card, Skeleton } from '../components/ui'
import { IdeaDisplay } from '../components/features'
import { Sparkles, Code2, Target, TrendingUp } from 'lucide-react'

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
]

const techFocuses = [
  { value: 'web', label: 'Web Development' },
  { value: 'backend', label: 'Backend / API' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'devops', label: 'DevOps / Cloud' }
]

const interestDomains = [
  { value: 'productivity', label: 'Productivity' },
  { value: 'finance', label: 'Finance / Fintech' },
  { value: 'health', label: 'Health / Wellness' },
  { value: 'education', label: 'Education' },
  { value: 'social', label: 'Social / Community' },
  { value: 'gaming', label: 'Gaming / Entertainment' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'tools', label: 'Developer Tools' },
  { value: 'automation', label: 'Automation' },
  { value: 'sustainability', label: 'Sustainability' }
]

export default function GeneratorPage() {
  const router = useRouter()
  const [skillLevel, setSkillLevel] = useState('')
  const [techFocus, setTechFocus] = useState('')
  const [interestDomain, setInterestDomain] = useState('')
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!skillLevel || !techFocus || !interestDomain) {
      setError('Please fill in all fields')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillLevel, techFocus, interestDomain })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate idea')
      }

      setIdea(data.idea)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateNew = () => {
    setIdea('')
  }

  const handleGenerateRoadmap = () => {
    router.push(`/roadmap?idea=${encodeURIComponent(idea)}`)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Project Idea Generator
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Get a portfolio-ready project idea tailored to your skills and interests.
            No more "what should I build?" paralysis.
          </p>
        </div>

        {!idea ? (
          <Card className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Tips */}
              <div className="p-4 bg-background rounded-lg border border-surface-light">
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  Tips for Better Results
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Be honest about your skill level—the right challenge leads to real growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Choose a domain you're genuinely curious about—passion shows in your work</span>
                  </li>
                </ul>
              </div>

              <Input
                label="Your Skill Level"
                value={skillLevel}
                onChange={setSkillLevel}
                type="select"
                options={[
                  { value: '', label: 'Select skill level...' },
                  ...skillLevels
                ]}
                error={error && !skillLevel ? 'Please select a skill level' : ''}
              />

              <Input
                label="Tech Focus"
                value={techFocus}
                onChange={setTechFocus}
                type="select"
                options={[
                  { value: '', label: 'Select tech focus...' },
                  ...techFocuses
                ]}
                error={error && !techFocus ? 'Please select a tech focus' : ''}
              />

              <Input
                label="Interest Domain"
                value={interestDomain}
                onChange={setInterestDomain}
                type="select"
                options={[
                  { value: '', label: 'Select interest domain...' },
                  ...interestDomains
                ]}
                error={error && !interestDomain ? 'Please select an interest domain' : ''}
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleGenerate}
                loading={loading}
                className="w-full"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Project Idea
              </Button>
            </div>
          </Card>
        ) : (
          <IdeaDisplay
            idea={idea}
            onGenerateNew={handleGenerateNew}
            onGenerateRoadmap={handleGenerateRoadmap}
            loading={loading}
          />
        )}

        {/* Examples Section */}
        {!idea && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-center mb-6">
              Popular Project Ideas
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <ExampleCard
                title="Task Manager API"
                tags={['Backend', 'Intermediate']}
                onSelect={() => {
                  setTechFocus('backend')
                  setSkillLevel('intermediate')
                  setInterestDomain('productivity')
                }}
              />
              <ExampleCard
                title="Weather Dashboard"
                tags={['Frontend', 'Beginner']}
                onSelect={() => {
                  setTechFocus('frontend')
                  setSkillLevel('beginner')
                  setInterestDomain('productivity')
                }}
              />
              <ExampleCard
                title="CI/CD Pipeline Tool"
                tags={['DevOps', 'Advanced']}
                onSelect={() => {
                  setTechFocus('devops')
                  setSkillLevel('advanced')
                  setInterestDomain('developer-tools')
                }}
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
  tags,
  onSelect
}: {
  title: string
  tags: string[]
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="p-4 bg-surface rounded-lg border border-surface-light text-left hover:border-primary hover:bg-surface/80 transition-all group"
    >
      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
        {title}
      </h3>
      <div className="flex gap-2 mt-2">
        {tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 bg-background rounded text-text-secondary">
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}
