import Link from 'next/link'
import { Card } from '../components/ui'
import { Code2, Sparkles, Brain, Target, MapPin, ChevronRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About AI Fusion
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Empowering the next generation of developers with AI-powered guidance for building portfolio-worthy projects.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <Card>
            <p className="text-text-secondary leading-relaxed mb-4">
              AI Fusion was built to solve a common problem faced by new developers: the "what should I build?" paralysis.
              Too often, aspiring developers either build the same generic projects (todo apps, weather apps) that don't
              showcase real skills, or they attempt projects that are too complex and never finish.
            </p>
            <p className="text-text-secondary leading-relaxed">
              We believe every developer deserves access to high-quality project ideas that challenge them appropriately,
              teach real engineering concepts, and result in portfolio pieces that impress recruiters and interviewers.
            </p>
          </Card>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Smart Idea Generation"
              description="Get project ideas tailored to your skill level, tech stack preferences, and interest areas."
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Project Analysis"
              description="Have an idea? Get honest, constructive feedback on complexity, feasibility, and portfolio value."
            />
            <FeatureCard
              icon={<MapPin className="w-6 h-6" />}
              title="Implementation Roadmaps"
              description="Transform any idea into a step-by-step build plan with learning objectives and milestones."
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <Card>
            <div className="space-y-8">
              <StepItem
                number="1"
                title="Choose Your Parameters"
                description="Select your current skill level, preferred tech stack, and domains that interest you. The more specific, the better the results."
              />
              <StepItem
                number="2"
                title="Generate or Analyze"
                description="Let AI create a custom project idea for you, or paste your own idea for detailed analysis and feedback."
              />
              <StepItem
                number="3"
                title="Build with Guidance"
                description="Follow a structured roadmap with clear phases, learning objectives, and acceptance criteria."
              />
            </div>
          </Card>
        </section>

        {/* Target Audience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Who This Is For</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <AudienceCard
              title="CS Students"
              description="Bridge the gap between academic projects and real-world development experience."
            />
            <AudienceCard
              title="Self-Taught Developers"
              description="Learn engineering best practices without the structure of a formal education."
            />
            <AudienceCard
              title="Bootcamp Graduates"
              description="Build additional portfolio projects to strengthen your job search."
            />
            <AudienceCard
              title="Career Changers"
              description="Demonstrate your skills to potential employers with concrete project evidence."
            />
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Built With Modern Tech</h2>
          <Card>
            <p className="text-text-secondary mb-6">
              AI Fusion is itself a demonstration of modern web development practices:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <TechItem name="Next.js 14" description="App Router, Server Components" />
              <TechItem name="TypeScript" description="Type-safe development" />
              <TechItem name="Tailwind CSS" description="Utility-first styling" />
              <TechItem name="Gemini AI" description="Generative AI powered insights" />
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Stop wondering what to build next. Let AI help you create projects that showcase real engineering skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generator"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all glow-primary"
            >
              Generate Project Idea
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/analyzer"
              className="inline-flex items-center px-6 py-3 bg-surface hover:bg-surface/80 text-text-primary rounded-lg font-semibold transition-all border border-surface-light"
            >
              Analyze Existing Idea
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="text-center h-full">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </Card>
  )
}

function StepItem({
  number,
  title,
  description
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </div>
    </div>
  )
}

function AudienceCard({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <Card className="h-full">
      <h3 className="font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </Card>
  )
}

function TechItem({
  name,
  description
}: {
  name: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
      <div>
        <span className="font-medium text-text-primary">{name}</span>
        <span className="text-text-secondary text-sm"> — {description}</span>
      </div>
    </div>
  )
}
