'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, use } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { modules } from '@/lib/content'

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params)
  const module = modules.find((m) => m.id === moduleId)
  const containerRef = useRef<HTMLDivElement>(null)
  const [progressCount, setProgressCount] = useState(0)

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

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <p className="text-muted-foreground">মডিউল পাওয়া যায়নি</p>
          <Link href="/learn" className="text-primary hover:underline mt-4 inline-block">
            ফিরে যান
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/learn" className="text-primary hover:text-primary/80 mb-6 inline-block animate-in font-semibold">
          ← পিছনে ফিরুন
        </Link>
        <div className="flex items-center gap-6 mb-8 animate-in">
          <span className="text-7xl">{module.icon}</span>
          <div>
            <h1 className="text-5xl font-bold text-primary mb-2">{module.bengaliTitle}</h1>
            <p className="text-foreground text-lg">{module.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="animate-in bg-muted p-6 rounded-lg border-2 border-primary/30">
          <p className="text-base font-semibold text-foreground mb-3">আপনার অগ্রগতি: {progressCount} / {module.lessons.length} পাঠ</p>
          <div className="w-full bg-muted-foreground/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
              style={{ width: `${(progressCount / module.lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">এই মডিউলের পাঠসমূহ</h2>
        <div className="grid grid-cols-1 gap-5">
          {module.lessons.map((lesson, index) => (
            <div key={lesson.id} className="animate-in">
              <Link href={`/learn/${module.id}/${lesson.id}`}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-102 cursor-pointer border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-base font-bold text-white bg-primary px-4 py-2 rounded-lg">
                          পাঠ {lesson.order}
                        </span>
                        <h3 className="font-bold text-xl text-foreground">{lesson.bengaliTitle}</h3>
                      </div>
                      <p className="text-foreground/70 text-base">{lesson.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-fit mt-1 border-primary text-primary hover:bg-primary/10">
                      খুলুন →
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-10 bg-gradient-to-r from-primary to-secondary border-2 border-primary/50">
          <h3 className="text-3xl font-bold mb-4 animate-in text-white">সবগুলো মডিউল শেষ করুন</h3>
          <p className="text-white/90 mb-8 animate-in text-base">
            সমস্ত মডিউল সম্পূর্ণ করার পরে, সমস্যা সমাধানে যান এবং আপনার দক্ষতা পরীক্ষা করুন।
          </p>
          <Link href="/problems" className="inline-block">
            <Button size="lg" className="animate-in bg-white text-primary hover:bg-white/90 font-bold">
              সমস্যা সমাধানে যান →
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
