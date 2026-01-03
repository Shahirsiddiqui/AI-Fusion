'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button, Card, Skeleton } from '../components/ui'
import { IdeaDisplay } from '../components/features'
import { Sparkles, Code2, Target, TrendingUp, Lightbulb, CheckCircle } from 'lucide-react'

const skillLevels = [
  { value: 'Beginner', label: 'Beginner - Just Starting' },
  { value: 'Intermediate', label: 'Intermediate - Some Projects Done' },
  { value: 'Advanced', label: 'Advanced - Experienced Developer' }
]

const techFocuses = [
  { value: 'Web', label: 'Web Development' },
  { value: 'Backend', label: 'Backend / API' },
  { value: 'Frontend', label: 'Frontend / UI' },
  { value: 'Mobile', label: 'Mobile Apps' },
  { value: 'Full Stack', label: 'Full Stack' },
  { value: 'DevOps', label: 'DevOps / Cloud' }
]

const interestDomains = [
  { value: 'Productivity', label: 'Productivity & Task Management' },
  { value: 'Finance', label: 'Finance / Fintech' },
  { value: 'Health', label: 'Health & Wellness' },
  { value: 'Education', label: 'Education & Learning' },
  { value: 'Social', label: 'Social & Community' },
  { value: 'Gaming', label: 'Gaming & Entertainment' },
  { value: 'Ecommerce', label: 'E-commerce & Shopping' },
  { value: 'Tools', label: 'Developer Tools' },
  { value: 'Automation', label: 'Automation & Workflows' },
  { value: 'Sustainability', label: 'Sustainability & Impact' }
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

      setIdea(data.data?.idea || data.idea)
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
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-transparent to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-2xl mb-6 border border-primary/30 backdrop-blur-sm">
            <Sparkles className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Project Idea Generator
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Get a <span className="text-primary font-semibold">portfolio-ready</span> project idea tailored to your skills and interests.
            <br />No more <span className="italic">"what should I build?"</span> paralysis.
          </p>
        </div>

        {!idea ? (
          <Card className="max-w-2xl mx-auto border-primary/20 backdrop-blur-sm">
            <div className="space-y-8">
              {/* Tips */}
              <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Pro Tips for Best Results
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary"><span className="text-text-primary font-semibold">Be honest</span> about your skill level—the right challenge leads to real growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary"><span className="text-text-primary font-semibold">Choose wisely</span>—pick a domain you're genuinely curious about</span>
                  </li>
                </ul>
              </div>

              {/* Form Fields with Enhanced Styling */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-text-primary">
                    Your Skill Level
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {skillLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setSkillLevel(level.value)}
                        className={`p-3 rounded-lg border-2 transition-all text-left font-medium ${
                          skillLevel === level.value
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-surface-light bg-surface/50 text-text-secondary hover:border-primary/50 hover:bg-surface'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-text-primary">
                    Tech Focus
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {techFocuses.map((tech) => (
                      <button
                        key={tech.value}
                        onClick={() => setTechFocus(tech.value)}
                        className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                          techFocus === tech.value
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-surface-light bg-surface/50 text-text-secondary hover:border-primary/50 hover:bg-surface'
                        }`}
                      >
                        {tech.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-text-primary">
                    Interest Domain
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {interestDomains.map((domain) => (
                      <button
                        key={domain.value}
                        onClick={() => setInterestDomain(domain.value)}
                        className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                          interestDomain === domain.value
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-surface-light bg-surface/50 text-text-secondary hover:border-primary/50 hover:bg-surface'
                        }`}
                      >
                        {domain.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm font-semibold">{error}</p>
                </div>
              )}

              {/* Enhanced Button */}
              <Button
                onClick={handleGenerate}
                loading={loading}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl hover:shadow-primary/50"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                {loading ? 'Generating Your Idea...' : 'Generate Project Idea'}
              </Button>

              {/* Progress Indicator */}
              <div className="pt-4 border-t border-surface-light">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Selection Progress</span>
                  <div className="flex gap-2">
                    <div className={`w-2 h-2 rounded-full transition-all ${skillLevel ? 'bg-primary' : 'bg-surface-light'}`} />
                    <div className={`w-2 h-2 rounded-full transition-all ${techFocus ? 'bg-primary' : 'bg-surface-light'}`} />
                    <div className={`w-2 h-2 rounded-full transition-all ${interestDomain ? 'bg-primary' : 'bg-surface-light'}`} />
                  </div>
                </div>
              </div>
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

        {/* Quick Start Examples */}
        {!idea && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Or Quick Start With Popular Ideas</h2>
              <p className="text-text-secondary">Click an example to auto-fill the form</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <ExampleCard
                title="Task Manager API"
                tags={['Backend', 'Intermediate']}
                icon={<Code2 className="w-5 h-5" />}
                onSelect={() => {
                  setTechFocus('Backend')
                  setSkillLevel('Intermediate')
                  setInterestDomain('Productivity')
                }}
              />
              <ExampleCard
                title="Weather Dashboard"
                tags={['Frontend', 'Beginner']}
                icon={<TrendingUp className="w-5 h-5" />}
                onSelect={() => {
                  setTechFocus('Frontend')
                  setSkillLevel('Beginner')
                  setInterestDomain('Productivity')
                }}
              />
              <ExampleCard
                title="CI/CD Pipeline Tool"
                tags={['DevOps', 'Advanced']}
                icon={<Target className="w-5 h-5" />}
                onSelect={() => {
                  setTechFocus('DevOps')
                  setSkillLevel('Advanced')
                  setInterestDomain('Tools')
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
  icon,
  onSelect
}: {
  title: string
  tags: string[]
  icon: React.ReactNode
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="group p-5 bg-gradient-to-br from-surface to-surface/50 rounded-xl border-2 border-surface-light hover:border-primary/50 text-left transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-surface/80"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors text-lg">
          {title}
        </h3>
        <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span key={tag} className="text-xs px-3 py-1 bg-background rounded-full text-text-secondary font-medium border border-surface-light">
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}
