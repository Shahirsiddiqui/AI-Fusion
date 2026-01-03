import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { Code2, Menu, X, Sparkles } from 'lucide-react'
import { ErrorBoundary } from './components/ui'

export const metadata: Metadata = {
  title: 'AI Fusion - Build Better Software Projects',
  description: 'AI-powered platform for developers to generate project ideas, analyze concepts, and create implementation roadmaps.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <Link href="/" className="flex items-center space-x-2 group">
                    <div className="p-2 bg-primary rounded-lg glow-primary group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">AI Fusion</span>
                  </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <NavLink href="/generator">Generator</NavLink>
                  <NavLink href="/analyzer">Analyzer</NavLink>
                  <NavLink href="/roadmap">Roadmap</NavLink>
                  <NavLink href="/about">About</NavLink>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    href="/generator"
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors glow-primary"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Get Started</span>
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-text-secondary hover:text-text-primary">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden bg-surface border-t border-surface-light">
              <div className="px-4 py-3 space-y-2">
                <MobileNavLink href="/generator">Generator</MobileNavLink>
                <MobileNavLink href="/analyzer">Analyzer</MobileNavLink>
                <MobileNavLink href="/roadmap">Roadmap</MobileNavLink>
                <MobileNavLink href="/about">About</MobileNavLink>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 pt-16">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-surface border-t border-surface-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  <span className="text-text-secondary">AI Fusion</span>
                </div>
                <p className="text-text-secondary text-sm">
                  Built with Next.js, Tailwind CSS, and Gemini AI
                </p>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                    Terms
                  </a>
                </div>
              </div>
            </div>
          </footer>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-text-secondary hover:text-text-primary transition-colors font-medium"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-colors"
    >
      {children}
    </Link>
  )
}
