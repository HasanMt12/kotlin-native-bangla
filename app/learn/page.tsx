'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { modules } from '@/lib/content'

export default function LearnPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
              <Button size="sm" className="bg-primary">পড়ুন</Button>
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="text-primary hover:text-primary/80 mb-4 inline-block animate-in font-semibold">
          ← ফিরে যান
        </Link>
        <h1 className="text-5xl font-bold mb-4 animate-in text-primary">শেখার মডিউল</h1>
        <p className="text-xl text-foreground animate-in">
          Kotlin শেখার জন্য সংগঠিত পথ। প্রতিটি মডিউল আপনাকে ক্রমান্বয়ে এগিয়ে নিয়ে যাবে।
        </p>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="animate-in">
              <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                <div className="flex items-start justify-between mb-6 flex-col md:flex-row gap-6">
                  <div>
                    <p className="text-6xl mb-4">{module.icon}</p>
                    <h2 className="text-4xl font-bold mb-3 text-primary">{module.bengaliTitle}</h2>
                    <p className="text-foreground text-base leading-relaxed">{module.description}</p>
                  </div>
                  <Link href={`/learn/${module.id}`} className="h-fit">
                    <Button className="h-fit px-8 py-3 text-base bg-primary hover:bg-primary/90">শুরু করুন</Button>
                  </Link>
                </div>

                {/* Lessons List */}
                <div className="mt-8 pt-8 border-t-2 border-primary/20">
                  <h3 className="font-bold text-base text-primary mb-4">
                    {module.lessons.length} টি পাঠ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/learn/${module.id}/${lesson.id}`}
                        className="flex items-start gap-4 p-4 rounded-lg bg-muted hover:bg-primary/10 transition-all duration-300 border-2 border-primary/30 hover:border-primary/60"
                      >
                        <span className="text-primary font-bold text-lg min-w-fit">{lesson.order}.</span>
                        <div className="flex-1">
                          <p className="font-semibold text-base text-foreground">{lesson.bengaliTitle}</p>
                          <p className="text-sm text-foreground/80 mt-1 leading-relaxed">{lesson.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Card className="p-12 bg-gradient-to-r from-primary to-secondary border-2 border-primary">
          <h3 className="text-3xl font-bold mb-4 animate-in text-white">প্রথম মডিউল দিয়ে শুরু করুন</h3>
          <p className="text-white/90 mb-8 animate-in text-base">
            মৌলিক বিষয় দিয়ে শুরু করা যা সবকিছুর ভিত্তি
          </p>
          <Link href={`/learn/${modules[0].id}`} className="inline-block">
            <Button size="lg" className="animate-in bg-white text-primary hover:bg-white/90 font-bold text-base">
              {modules[0].bengaliTitle} খুলুন
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
