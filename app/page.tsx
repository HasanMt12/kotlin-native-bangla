'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { modules, problems } from '@/lib/content'
import { getProgress } from '@/lib/progress'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState<any>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    setProgress(getProgress())

    // GSAP animations
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

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const completedLessons = progress?.completedLessons?.length || 0
  const solvedProblems = progress?.solvedProblems?.length || 0

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navbar */}
      <nav className="animate-in sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔷</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-default">
              কটলিন শিখি
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <Link href="/learn">
              <Button variant="outline" size="sm">পড়ুন</Button>
            </Link>
            <Link href="/problems">
              <Button variant="outline" size="sm">সমস্যা সমাধান করুন</Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="sm">সম্পদ</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Kotlin এ মাস্টার হয়ে উঠুন
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            বাংলায় পরিপূর্ণ Kotlin টিউটোরিয়াল, উদাহরণ এবং ইন্টারঅ্যাক্টিভ সমস্যা সমাধান
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/learn">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                এখনই শুরু করুন
              </Button>
            </Link>
            <Link href="/problems">
              <Button size="lg" variant="outline">
                সমস্যা সমাধান করুন
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-in">
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">{modules.length}</p>
              <p className="text-muted-foreground">শেখার মডিউল</p>
            </Card>
          </div>
          <div className="animate-in">
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-secondary mb-2">{totalLessons}</p>
              <p className="text-muted-foreground">বিস্তারিত পাঠ</p>
            </Card>
          </div>
          <div className="animate-in">
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-accent mb-2">{problems.length}</p>
              <p className="text-muted-foreground">অনুশীলনের সমস্যা</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Progress */}
      {progress && (completedLessons > 0 || solvedProblems > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="text-2xl font-bold mb-6 animate-in">আপনার অগ্রগতি</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-in">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">সম্পূর্ণ পাঠ</p>
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-primary">{completedLessons}</p>
                  <p className="text-muted-foreground">/{totalLessons}</p>
                </div>
              </Card>
            </div>
            <div className="animate-in">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">সমাধান করা সমস্যা</p>
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-secondary">{solvedProblems}</p>
                  <p className="text-muted-foreground">/{problems.length}</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Modules Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold mb-8 animate-in">শেখার পথ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="animate-in">
              <Link href={`/learn/${module.id}`}>
                <Card className="p-6 h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <p className="text-3xl mb-3">{module.icon}</p>
                  <h4 className="font-bold text-lg mb-2">{module.bengaliTitle}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <p className="text-xs text-primary font-semibold">{module.lessons.length} পাঠ</p>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold mb-8 text-center animate-in">কেন এই প্ল্যাটফর্ম?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '📖', title: 'সহজ শিক্ষা', desc: 'Step by step বাংলা টিউটোরিয়াল' },
            { icon: '💡', title: 'বাস্তব উদাহরণ', desc: 'প্রতিটি পাঠে কোড উদাহরণ' },
            { icon: '���', title: 'সমস্যা সমাধান', desc: '২০+ ইন্টারঅ্যাক্টিভ সমস্যা' },
          ].map((feature, i) => (
            <div key={i} className="animate-in">
              <Card className="p-6 text-center">
                <p className="text-4xl mb-3">{feature.icon}</p>
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-in bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-border">
          <h3 className="text-3xl font-bold mb-4">এখনই শুরু করুন</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Kotlin শেখা এখন আর কখনো সহজ ছিল না
          </p>
          <Link href="/learn">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              প্রথম মডিউল খুলুন
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>কটলিন শিখি © {new Date().getFullYear()} | বাংলায় শেখার একটি উন্মুক্ত প্ল্যাটফর্ম</p>
        </div>
      </footer>
    </div>
  )
}
