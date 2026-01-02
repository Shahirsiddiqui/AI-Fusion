# AI Fusion - Build Better Software Projects

AI Fusion is a web-based AI platform designed to help new and early-stage developers generate strong software project ideas and analyze their own ideas using real software engineering principles.

## Features

### 1. AI Project Idea Generator
Generate portfolio-ready project ideas tailored to your:
- **Skill Level**: Beginner, Intermediate, or Advanced
- **Tech Focus**: Web, Backend, Frontend, Mobile, Full Stack, or DevOps
- **Interest Domain**: Productivity, Finance, Health, Education, and more

### 2. Project Idea Analyzer
Paste your own project idea and get detailed feedback on:
- Technical complexity assessment
- Strengths and weaknesses
- Engineering improvement suggestions
- Portfolio and interview value score (1-10)

### 3. Build Roadmap Generator
Get a step-by-step implementation plan including:
- Phase-by-phase breakdown
- Learning objectives at each stage
- Tools and libraries required
- Clear acceptance criteria

## Quick Start

### Option 1: Standalone HTML Files (No Installation Required)

Simply open the HTML files in your browser:

1. `index.html` - Landing page
2. `generator.html` - Project idea generator
3. `analyzer.html` - Project idea analyzer
4. `roadmap.html` - Build roadmap generator
5. `about.html` - About page

### Option 2: Next.js Development Version

For the full Next.js application with AI integration:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Gemini API key

# Run development server
npm run dev
```

Then open http://localhost:3000 in your browser.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Standalone) / Next.js 14 (Development)
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React

## Project Structure

```
ai-fusion/
├── index.html          # Landing page
├── generator.html      # Project idea generator
├── analyzer.html       # Project idea analyzer
├── roadmap.html        # Build roadmap generator
├── about.html          # About page
├── README.md           # This file
└── app/                # Next.js source (for development version)
    ├── api/
    │   ├── generate/   # API route for idea generation
    │   ├── analyze/    # API route for idea analysis
    │   └── roadmap/    # API route for roadmap generation
    ├── components/     # React components
    ├── generator/      # Generator page
    ├── analyzer/       # Analyzer page
    ├── roadmap/        # Roadmap page
    └── about/          # About page
```

## API Integration

To enable real AI features in the Next.js version, you need a Gemini API key:

1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Add it to your `.env.local` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Demo Mode

The standalone HTML files include demo content that simulates AI responses. This allows you to explore the UI and user flow without needing an API key.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
