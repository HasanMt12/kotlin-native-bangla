'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, use } from 'react'
import gsap from 'gsap'
import Highlight from 'prism-react-renderer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { modules } from '@/lib/content'
import { markLessonComplete, getProgress } from '@/lib/progress'

export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>
}) {
  const { moduleId, lessonId } = use(params)
  const module = modules.find((m) => m.id === moduleId)
  const lesson = module?.lessons.find((l) => l.id === lessonId)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCompleted, setIsCompleted] = useState(false)

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

    const progress = getProgress()
    setIsCompleted(progress.completedLessons.includes(lessonId))
  }, [lessonId])

  const handleComplete = () => {
    markLessonComplete(lessonId)
    setIsCompleted(true)
    gsap.to(containerRef.current, {
      duration: 0.3,
      backgroundColor: 'var(--accent)',
    })
  }

  if (!module || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <p className="text-muted-foreground">পাঠ পাওয়া যায়নি</p>
          <Link href="/learn" className="text-primary hover:underline mt-4 inline-block">
            ফিরে যান
          </Link>
        </Card>
      </div>
    )
  }

  const allLessons = module.lessons
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const nextLesson = allLessons[currentIndex + 1]
  const prevLesson = allLessons[currentIndex - 1]

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b text-card-foreground from-background to-muted"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href={`/learn/${module.id}`}
          className="text-primary hover:text-primary/80 mb-6 inline-block animate-in font-semibold"
        >
          ← {module.bengaliTitle} এ ফিরুন
        </Link>

        <div className="mb-10 animate-in">
          <h1 className="text-5xl font-bold mb-3 text-primary">{lesson.bengaliTitle}</h1>
          <p className="text-xl text-foreground mb-6">{lesson.description}</p>

          {isCompleted && (
            <div className="inline-flex items-center gap-3 bg-accent text-white px-6 py-3 rounded-lg font-semibold">
              <span className="text-xl">✓</span>
              <span>আপনি এই পাঠ শেষ করেছেন</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Theory */}
        <Card className="p-10 mb-10 animate-in border-2 border-primary/30">
          <h2 className="text-3xl font-bold mb-6 text-primary">ধারণা (Concept)</h2>
          <div className="space-y-5 text-foreground text-lg leading-relaxed">
            {lesson.content.split('\n').map((line, i) => (
              line.trim() && <p key={i} className="text-base">{line}</p>
            ))}
          </div>
        </Card>

        {/* Code Example */}
        <Card className="p-10 mb-10 animate-in overflow-hidden border-2 border-primary/30">
          <h2 className="text-3xl font-bold mb-6 text-primary">কোড উদাহরণ</h2>
          <pre className="bg-slate-900 dark:bg-slate-950 p-6 rounded-lg overflow-x-auto text-sm text-white border border-slate-700">
            <code className="text-white text-base leading-relaxed">{lesson.code}</code>
          </pre>
        </Card>

        {/* Output */}
        <Card className="p-10 mb-10 animate-in bg-slate-900 dark:bg-slate-950 border-2 border-primary/30">
          <h2 className="text-3xl font-bold mb-6 text-primary">প্রত্যাশিত আউটপুট</h2>
          <div className="bg-slate-800 dark:bg-slate-900 rounded-lg p-6 font-mono text-base text-green-400 border border-slate-700 overflow-x-auto">
            {lesson.output}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4 mb-10 animate-in flex-col sm:flex-row">
          {prevLesson ? (
            <Link href={`/learn/${module.id}/${prevLesson.id}`} className="flex-1">
              <Button variant="outline" className="w-full justify-start border-2 border-primary/50 hover:bg-primary/10">
                ← পূর্ববর্তী পাঠ
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {!isCompleted ? (
            <Button onClick={handleComplete} className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-3 text-base">
              এই পাঠ সম্পূর্ণ করুন ✓
            </Button>
          ) : (
            <Button variant="outline" className="flex-1 border-2 border-accent bg-accent/10" disabled>
              সম্পূর্ণ হয়েছে ✓
            </Button>
          )}

          {nextLesson ? (
            <Link href={`/learn/${module.id}/${nextLesson.id}`} className="flex-1">
              <Button className="w-full justify-end bg-primary hover:bg-primary/90 text-white font-bold py-3 text-base">
                পরবর্তী পাঠ →
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Final CTA */}
        {!nextLesson && (
          <Card className="p-10 bg-gradient-to-r from-primary to-secondary border-2 border-primary/50 animate-in">
            <h3 className="text-3xl font-bold mb-4 text-white">এই মডিউল সম্পূর্ণ হয়েছে!</h3>
            <p className="text-white/90 mb-8 text-base">
              পরবর্তী মডিউলে যান বা সমস্যা সমাধান করে আপনার দক্ষতা পরীক্ষা করুন।
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link href="/learn" className="flex-1">
                <Button variant="outline" className="w-full border-white text-white hover:bg-white/10 font-bold">
                  পরবর্তী মডিউল
                </Button>
              </Link>
              <Link href="/problems" className="flex-1">
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                  সমস্যা সমাধান করুন →
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
