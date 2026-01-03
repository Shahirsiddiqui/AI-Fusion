import Link from 'next/link'
import { ArrowRight, Sparkles, Target, TrendingUp, Code2, Brain, MapPin, Zap, Shield, Rocket } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Enhanced Gradient */}
      <section className="relative overflow-hidden pt-5">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Animated Blob Background */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            {/* Badge with Animation */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-surface rounded-full mb-8 border border-surface-light backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
              <Sparkles className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-text-secondary text-sm font-medium">AI-Powered Project Guidance</span>
            </div>

            {/* Enhanced Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-text-primary">From Confusion </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent animate-gradient">to Clarity</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
              Get <span className="text-primary font-semibold">buildable</span>, <span className="text-accent font-semibold">portfolio-ready</span> project ideas and learn engineering thinking—not just inspiration. The AI mentor for developers who want to <span className="text-primary font-semibold">ship real skills</span>.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/generator"
                className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/50 hover:scale-105 font-semibold text-lg"
              >
                <Sparkles className="w-5 h-5 group-hover:animate-spin" style={{ animationDuration: '1.5s' }} />
                <span>Generate Project Idea</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/analyzer"
                className="group flex items-center space-x-2 px-8 py-4 bg-surface hover:bg-surface/80 text-text-primary border-2 border-surface-light hover:border-primary/50 rounded-xl transition-all duration-300 font-semibold text-lg hover:shadow-lg"
              >
                <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Analyze My Idea</span>
              </Link>
            </div>

            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
              <StatCard number="10K+" label="Ideas Generated" icon={<Rocket className="w-5 h-5" />} />
              <StatCard number="500+" label="Tech Stacks" icon={<Code2 className="w-5 h-5" />} />
              <StatCard number="95%" label="Success Rate" icon={<Zap className="w-5 h-5" />} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/30 border-y border-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Engineering-First Approach
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              We do not just generate ideas. We teach you how to think like a senior engineer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Smart Idea Generation"
              description="Get project ideas tailored to your skill level, tech focus, and interests. Each idea includes clear problem statements and core feature lists."
              color="from-primary"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Project Analysis"
              description="Paste your own ideas and get detailed feedback on complexity, feasibility, and portfolio value. Know exactly what to improve."
              color="from-accent"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Build Roadmaps"
              description="Step-by-step implementation plans with learning objectives, tools, and milestones. Turn ideas into actionable development plans."
              color="from-purple-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
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
      <section className="py-24 bg-surface/30 border-y border-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Built for Developers Like You
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AudienceCard
              icon={<Code2 className="w-6 h-6" />}
              title="Beginners"
              description="Find the perfect starting point with guided, achievable projects."
              gradient="from-blue-500/20"
            />
            <AudienceCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="CS Students"
              description="Bridge the gap between coursework and real-world development."
              gradient="from-green-500/20"
            />
            <AudienceCard
              icon={<Brain className="w-6 h-6" />}
              title="Self-Taught Devs"
              description="Learn engineering best practices without expensive bootcamps."
              gradient="from-purple-500/20"
            />
            <AudienceCard
              icon={<Shield className="w-6 h-6" />}
              title="Portfolio Builders"
              description="Create impressive projects that stand out to recruiters."
              gradient="from-pink-500/20"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-text-secondary text-xl mb-10 max-w-2xl mx-auto">
            Stop building todo apps. Start creating projects that demonstrate real engineering skills.
          </p>
          <Link
            href="/generator"
            className="inline-flex items-center space-x-2 px-10 py-5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/50 hover:scale-105 font-semibold text-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Generating Ideas</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <div className={`group p-8 bg-gradient-to-br ${color} to-transparent rounded-2xl border border-surface-light backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1`}>
      <div className="mb-4 p-3 bg-background rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}

function StatCard({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-surface/50 rounded-xl border border-surface-light backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
      <div className="text-primary group-hover:scale-110 transition-transform duration-300 mb-2">{icon}</div>
      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{number}</div>
      <div className="text-text-secondary text-sm mt-2">{label}</div>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="group relative p-8 hover:bg-surface/50 rounded-2xl transition-all duration-300 border border-transparent hover:border-surface-light">
      <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">{number[0]}</div>
      <h3 className="text-2xl font-bold mb-3 ml-8 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-text-secondary leading-relaxed ml-8">{description}</p>
    </div>
  )
}

function AudienceCard({ icon, title, description, gradient }: { icon: React.ReactNode; title: string; description: string; gradient: string }) {
  return (
    <div className={`group p-6 bg-gradient-to-br ${gradient} to-transparent rounded-xl border border-surface-light backdrop-blur-sm hover:border-primary/50 transition-all duration-300 text-center hover:shadow-lg hover:-translate-y-1`}>
      <div className="flex justify-center mb-4 group-hover:scale-125 transition-transform duration-300">
        <div className="p-3 bg-background rounded-full text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  )
}
