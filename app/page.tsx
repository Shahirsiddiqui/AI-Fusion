import Link from 'next/link'
import { ArrowRight, Sparkles, Target, TrendingUp, Code2, Brain, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-surface rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-text-secondary text-sm">AI-Powered Project Guidance</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-text-primary">From Confusion to </span>
              <span className="gradient-text">Clarity</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              Get buildable, portfolio-ready project ideas and learn engineering thinking—not just inspiration.
              The AI mentor for developers who want to ship real skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/generator"
                className="flex items-center space-x-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all glow-primary hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Generate Project Idea</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/analyzer"
                className="flex items-center space-x-2 px-8 py-4 bg-surface hover:bg-surface/80 text-text-primary border border-surface-light rounded-lg transition-all hover:scale-105"
              >
                <Brain className="w-5 h-5" />
                <span className="font-semibold">Analyze My Idea</span>
              </Link>
            </div>

            {/* Stats/Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10K+</div>
                <div className="text-text-secondary text-sm">Projects Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-text-secondary text-sm">Tech Stacks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">95%</div>
                <div className="text-text-secondary text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Engineering-First Approach
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              We do not just generate ideas. We teach you how to think like a senior engineer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="w-8 h-8 text-primary" />}
              title="Smart Idea Generation"
              description="Get project ideas tailored to your skill level, tech focus, and interests. Each idea includes clear problem statements and core feature lists."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-accent" />}
              title="Project Analysis"
              description="Paste your own ideas and get detailed feedback on complexity, feasibility, and portfolio value. Know exactly what to improve."
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8 text-purple-500" />}
              title="Build Roadmaps"
              description="Step-by-step implementation plans with learning objectives, tools, and milestones. Turn ideas into actionable development plans."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Three simple steps to accelerate your development journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Choose Your Path"
              description="Select your skill level, preferred tech stack, and interest domain to customize the experience."
            />
            <StepCard
              number="02"
              title="Generate or Analyze"
              description="Let AI create a portfolio-worthy project idea or analyze your existing concept for improvements."
            />
            <StepCard
              number="03"
              title="Build with Confidence"
              description="Follow a structured roadmap with learning objectives and milestones tailored to your project."
            />
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for Developers Like You
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AudienceCard
              icon={<Code2 className="w-6 h-6" />}
              title="Beginners"
              description="Find the perfect starting point with guided, achievable projects."
            />
            <AudienceCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="CS Students"
              description="Bridge the gap between coursework and real-world development."
            />
            <AudienceCard
              icon={<Brain className="w-6 h-6" />}
              title="Self-Taught Devs"
              description="Learn engineering best practices without expensive bootcamps."
            />
            <AudienceCard
              icon={<Target className="w-6 h-6" />}
              title="Portfolio Builders"
              description="Create impressive projects that stand out to recruiters."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Stop building todo apps. Start creating projects that demonstrate real engineering skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generator"
              className="flex items-center space-x-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all glow-primary"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Start Generating Ideas</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-surface rounded-xl border border-surface-light card-hover">
      <div className="mb-4 p-3 bg-background rounded-lg w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="relative p-6">
      <div className="text-6xl font-bold text-surface-light mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  )
}

function AudienceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-surface rounded-xl border border-surface-light text-center card-hover">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-background rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  )
}
