'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { problems } from '@/lib/content'
import { markProblemSolved, getProgress } from '@/lib/progress'

export default function ProblemsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [difficulty, setDifficulty] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all')
  const [selectedProblem, setSelectedProblem] = useState<typeof problems[0] | null>(null)
  const [solvedProblems, setSolvedProblems] = useState<string[]>([])

  useEffect(() => {
    const progress = getProgress()
    setSolvedProblems(progress.solvedProblems)

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate-in')
      gsap.from(elements, {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }
  }, [])

  const filteredProblems = difficulty === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty === difficulty)

  const handleSolved = () => {
    if (selectedProblem) {
      markProblemSolved(selectedProblem.id)
      setSolvedProblems(prev => 
        prev.includes(selectedProblem.id) ? prev : [...prev, selectedProblem.id]
      )
      
      // Animation
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          duration: 0.3,
          backgroundColor: 'var(--accent)',
        })
      }
    }
  }

  const difficultyColors = {
    Easy: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    Medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    Hard: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔷</span>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80">
              কটলিন শিখি
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href="/learn">
              <Button variant="outline" size="sm">পড়ুন</Button>
            </Link>
            <Link href="/problems">
              <Button size="sm" className="bg-primary">সমস্যা সমাধান করুন</Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="sm">সম্পদ</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="text-primary hover:text-primary/80 mb-6 inline-block animate-in font-semibold">
          ← হোম এ ফিরুন
        </Link>
        <h1 className="text-5xl font-bold mb-3 animate-in text-primary">সমস্যা সমাধান করুন</h1>
        <p className="text-xl text-foreground animate-in">
          {problems.length} টি সমস্যা বিভিন্ন কঠিনতার স্তরে। আপনার দক্ষতা পরীক্ষা করুন এবং উন্নত হন।
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in">
          <Card className="p-6 text-center border-2 border-primary/30">
            <p className="text-4xl font-bold text-primary mb-2">{solvedProblems.length}</p>
            <p className="text-base text-foreground font-semibold">সমাধান করা হয়েছে</p>
          </Card>
          <Card className="p-6 text-center border-2 border-secondary/30">
            <p className="text-4xl font-bold text-secondary mb-2">{problems.filter(p => p.difficulty === 'Easy').length}</p>
            <p className="text-base text-foreground font-semibold">সহজ সমস্যা</p>
          </Card>
          <Card className="p-6 text-center border-2 border-accent/30">
            <p className="text-4xl font-bold text-accent mb-2">{problems.length - solvedProblems.length}</p>
            <p className="text-base text-foreground font-semibold">সমাধানের অপেক্ষা</p>
          </Card>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h3 className="text-xl font-bold text-primary mb-4">কঠিনতা দ্বারা ফিল্টার করুন</h3>
        <div className="flex gap-3 flex-wrap animate-in">
          <Button 
            variant={difficulty === 'all' ? 'default' : 'outline'}
            onClick={() => setDifficulty('all')}
            className={difficulty === 'all' ? 'bg-primary text-white font-bold' : 'border-2 border-primary/50'}
          >
            সব সমস্যা
          </Button>
          {(['Easy', 'Medium', 'Hard'] as const).map(level => (
            <Button
              key={level}
              variant={difficulty === level ? 'default' : 'outline'}
              onClick={() => setDifficulty(level)}
              className={difficulty === level ? `${level === 'Easy' ? 'bg-green-500' : level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} text-white font-bold` : `border-2 ${level === 'Easy' ? 'border-green-500/50' : level === 'Medium' ? 'border-yellow-500/50' : 'border-red-500/50'}`}
            >
              {level === 'Easy' ? 'সহজ' : level === 'Medium' ? 'মাঝারি' : 'কঠিন'}
            </Button>
          ))}
        </div>
      </div>

      {/* Problems Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h3 className="text-2xl font-bold text-primary mb-6">সমস্যা সংগ্রহ ({filteredProblems.length})</h3>
        <div className="grid grid-cols-1 gap-5">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="animate-in">
              <Card className="p-7 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5" onClick={() => setSelectedProblem(problem)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      {solvedProblems.includes(problem.id) && (
                        <span className="text-2xl text-accent font-bold">✓</span>
                      )}
                      <h3 className="font-bold text-xl text-foreground">{problem.bengaliTitle}</h3>
                      <Badge className={`${difficultyColors[problem.difficulty as keyof typeof difficultyColors]} border font-semibold`}>
                        {problem.difficulty === 'Easy' ? 'সহজ' : problem.difficulty === 'Medium' ? 'মাঝারি' : 'কঠিন'}
                      </Badge>
                    </div>
                    <p className="text-foreground/70 text-base">{problem.description}</p>
                  </div>
                  <Button
                    onClick={() => setSelectedProblem(problem)}
                    variant="outline"
                    size="sm"
                    className="h-fit border-primary text-primary hover:bg-primary/10"
                  >
                    সমাধান দেখুন →
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Modal */}
      <Dialog open={!!selectedProblem} onOpenChange={() => setSelectedProblem(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProblem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-primary">{selectedProblem.bengaliTitle}</DialogTitle>
              </DialogHeader>

              <div className="space-y-8">
                {/* Problem Description */}
                <div>
                  <h3 className="font-bold text-lg text-primary mb-3">সমস্যা</h3>
                  <p className="text-foreground text-base leading-relaxed">{selectedProblem.description}</p>
                </div>

                {/* Input Output */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-primary mb-3">ইনপুট উদাহরণ</h4>
                    <p className="text-foreground/70 text-sm mb-3">{selectedProblem.inputDescription}</p>
                    <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 border border-slate-700 overflow-x-auto">
                      {selectedProblem.exampleInput}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-3">প্রত্যাশিত আউটপুট</h4>
                    <p className="text-foreground/70 text-sm mb-3">{selectedProblem.outputDescription}</p>
                    <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 border border-slate-700 overflow-x-auto">
                      {selectedProblem.exampleOutput}
                    </div>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="font-bold text-lg text-primary mb-4">সমাধান (Kotlin)</h3>
                  <pre className="bg-slate-900 dark:bg-slate-950 p-6 rounded-lg overflow-x-auto text-sm text-white border border-slate-700">
                    <code className="text-base leading-relaxed">{selectedProblem.solution}</code>
                  </pre>
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="font-bold text-lg text-primary mb-3">বিস্তারিত ব্যাখ্যা</h3>
                  <p className="text-foreground text-base leading-relaxed">{selectedProblem.explanation}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button
                    onClick={handleSolved}
                    disabled={solvedProblems.includes(selectedProblem.id)}
                    className={`flex-1 font-bold py-3 text-base ${solvedProblems.includes(selectedProblem.id) ? 'bg-accent' : 'bg-primary'}`}
                  >
                    {solvedProblems.includes(selectedProblem.id) ? '✓ সমাধান করা হয়েছে' : 'আমি সমাধান করেছি'}
                  </Button>
                  <Button
                    onClick={() => setSelectedProblem(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    বন্ধ করুন
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <h3 className="text-2xl font-bold mb-4 animate-in">আরও শিখুন</h3>
          <p className="text-muted-foreground mb-6 animate-in">
            সব সমস্যা সমাধান করে ফেলেছেন? শেখার মডিউলে ফিরে যান এবং আরও গভীরভাবে শিখুন।
          </p>
          <Link href="/learn">
            <Button size="lg" className="animate-in">
              শেখার মডিউলে যান
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
