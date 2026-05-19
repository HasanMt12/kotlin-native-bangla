'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

const resources = [
  {
    category: 'ডাউনলোড এবং সেটআপ',
    items: [
      {
        title: 'Kotlin অফিসিয়াল ওয়েবসাইট',
        description: 'কটলিন ভাষার অফিসিয়াল সাইট - সর্বশেষ সংস্করণ ডাউনলোড করুন',
        link: 'https://kotlinlang.org',
        icon: '🌐'
      },
      {
        title: 'IntelliJ IDEA ডাউনলোড',
        description: 'JetBrains এর শক্তিশালী IDE - Kotlin development এর জন্য সেরা',
        link: 'https://www.jetbrains.com/idea/download/',
        icon: '💻'
      },
      {
        title: 'Android Studio সেটআপ গাইড',
        description: 'Android development এর জন্য সম্পূর্ণ গাইড এবং সেটআপ',
        link: 'https://developer.android.com/studio',
        icon: '📱'
      },
    ]
  },
  {
    category: 'অনলাইন প্লেগ্রাউন্ড',
    items: [
      {
        title: 'Kotlin Playground',
        description: 'কোনো ইনস্টলেশন ছাড়াই ব্রাউজারে কটলিন কোড লিখুন এবং চালান',
        link: 'https://play.kotlinlang.org',
        icon: '🎮'
      },
      {
        title: 'JDoodle - Kotlin Compiler',
        description: 'অনলাইনে কটলিন কোড compile এবং execute করুন',
        link: 'https://www.jdoodle.com/execute-kotlin-online',
        icon: '⚙️'
      },
      {
        title: 'Replit - Kotlin Environment',
        description: 'সম্পূর্ণ Kotlin development environment অনলাইনে',
        link: 'https://replit.com/languages/kotlin',
        icon: '🚀'
      },
    ]
  },
  {
    category: 'অফিসিয়াল ডকুমেন্টেশন',
    items: [
      {
        title: 'Kotlin Documentation',
        description: 'Kotlin এর সম্পূর্ণ ডকুমেন্টেশন এবং রেফারেন্স গাইড',
        link: 'https://kotlinlang.org/docs/home.html',
        icon: '📖'
      },
      {
        title: 'Kotlin Tutorials',
        description: 'অফিসিয়াল কটলিন টিউটোরিয়াল এবং উদাহরণ',
        link: 'https://kotlinlang.org/docs/tutorials.html',
        icon: '🎓'
      },
      {
        title: 'Android Developer Documentation',
        description: 'Android development এর জন্য সম্পূর্ণ ডকুমেন্টেশন',
        link: 'https://developer.android.com/docs',
        icon: '📚'
      },
    ]
  },
  {
    category: 'কমিউনিটি এবং সাপোর্ট',
    items: [
      {
        title: 'Kotlin Reddit',
        description: 'কটলিন কমিউনিটি - প্রশ্ন করুন এবং অভিজ্ঞতা শেয়ার করুন',
        link: 'https://www.reddit.com/r/Kotlin/',
        icon: '👥'
      },
      {
        title: 'Kotlin Slack Channel',
        description: 'লাইভ চ্যাট এবং রিয়েল টাইম সাপোর্ট পান',
        link: 'https://kotlinlang.slack.com',
        icon: '💬'
      },
      {
        title: 'Stack Overflow - Kotlin',
        description: 'হাজারো প্রশ্ন এবং উত্তর খুঁজে পান',
        link: 'https://stackoverflow.com/questions/tagged/kotlin',
        icon: '❓'
      },
    ]
  },
  {
    category: 'ভিডিও টিউটোরিয়াল এবং কোর্স',
    items: [
      {
        title: 'YouTube - Kotlin for Beginners',
        description: 'বিনামূল্যে ভিডিও টিউটোরিয়াল শিরু থেকে শেষ পর্যন্ত',
        link: 'https://www.youtube.com/results?search_query=kotlin+for+beginners',
        icon: '📹'
      },
      {
        title: 'Udemy Kotlin Courses',
        description: 'সম্পূর্ণ কটলিন কোর্স - শুরু থেকে advanced পর্যায় পর্যন্ত',
        link: 'https://www.udemy.com/courses/search/?q=kotlin',
        icon: '🎬'
      },
      {
        title: 'Coursera Kotlin Programs',
        description: 'বিশ্ববিদ্যালয়ের মানের অনলাইন কোর্স',
        link: 'https://www.coursera.org/search?query=kotlin',
        icon: '🏫'
      },
    ]
  },
  {
    category: 'সরঞ্জাম এবং লাইব্রেরি',
    items: [
      {
        title: 'Gradle - Build Tool',
        description: 'Kotlin প্রজেক্টের জন্য powerful build system',
        link: 'https://gradle.org',
        icon: '🔨'
      },
      {
        title: 'Maven Repository',
        description: 'Kotlin এবং Java লাইব্রেরি খুঁজুন',
        link: 'https://mvnrepository.com',
        icon: '📦'
      },
      {
        title: 'GitHub - Awesome Kotlin',
        description: 'সেরা Kotlin রিসোর্স এবং প্রজেক্টের সংগ্রহ',
        link: 'https://github.com/KotlinBy/awesome-kotlin',
        icon: '⭐'
      },
    ]
  }
]

export default function ResourcesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate-in')
      gsap.from(elements, {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.05,
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
              <Button variant="outline" size="sm">পড়ুন</Button>
            </Link>
            <Link href="/problems">
              <Button variant="outline" size="sm">সমস্যা সমাধান করুন</Button>
            </Link>
            <Link href="/resources">
              <Button size="sm" className="bg-primary">সম্পদ</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-in">
          <h1 className="text-5xl font-bold text-primary mb-4">কটলিন শেখার সম্পদ</h1>
          <p className="text-xl text-foreground mb-2">
            Kotlin development শিখতে এবং আপনার দক্ষতা বৃদ্ধি করতে প্রয়োজনীয় সব সম্পদ এক জায়গায়।
          </p>
          <p className="text-base text-foreground/70">
            নিচের লিংকগুলি আপনাকে অফিসিয়াল ডকুমেন্টেশন, অনলাইন টুলস এবং কমিউনিটি রিসোর্স এ নিয়ে যাবে।
          </p>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-12">
          {resources.map((category, catIdx) => (
            <div key={catIdx} className="animate-in">
              <h2 className="text-3xl font-bold text-primary mb-6 pb-3 border-b-2 border-primary/30">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 cursor-pointer">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center text-primary font-semibold text-sm">
                        এখানে যান →
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="p-10 bg-gradient-to-r from-primary to-secondary border-2 border-primary/50">
          <h2 className="text-3xl font-bold text-white mb-6">শুরু করার গাইড</h2>
          
          <div className="space-y-6 text-white">
            <div className="animate-in">
              <h3 className="text-xl font-bold mb-2">১. প্রথম ধাপ - Kotlin Playground এ শুরু করুন</h3>
              <p className="text-white/90">
                কোনো ইনস্টলেশন ছাড়াই <a href="https://play.kotlinlang.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">Kotlin Playground এ</a> গিয়ে কোড লিখুন এবং তৎক্ষণাৎ ফলাফল দেখুন।
              </p>
            </div>

            <div className="animate-in">
              <h3 className="text-xl font-bold mb-2">২. IntelliJ IDEA বা Android Studio ইনস্টল করুন</h3>
              <p className="text-white/90 mb-2">
                প্রফেশনাল development এর জন্য JetBrains এর IDE ডাউনলোড করুন:
              </p>
              <ul className="list-disc list-inside text-white/90 space-y-1">
                <li><a href="https://www.jetbrains.com/idea/download/" target="_blank" rel="noopener noreferrer" className="underline">IntelliJ IDEA Community Edition</a> - সম্পূর্ণ বিনামূল্যে এবং শক্তিশালী</li>
                <li><a href="https://developer.android.com/studio" target="_blank" rel="noopener noreferrer" className="underline">Android Studio</a> - Android অ্যাপ ডেভেলপমেন্টের জন্য</li>
              </ul>
            </div>

            <div className="animate-in">
              <h3 className="text-xl font-bold mb-2">৩. Gradle এবং Build Tools সেটআপ করুন</h3>
              <p className="text-white/90">
                <a href="https://gradle.org" target="_blank" rel="noopener noreferrer" className="underline">Gradle এর অফিসিয়াল গাইড</a> অনুসরণ করে আপনার development environment সেট করুন।
              </p>
            </div>

            <div className="animate-in">
              <h3 className="text-xl font-bold mb-2">৪. আমাদের টিউটোরিয়াল অনুসরণ করুন</h3>
              <p className="text-white/90">
                <Link href="/learn" className="underline hover:text-white/70">শিখার পেজে</Link> যান এবং step-by-step টিউটোরিয়াল অনুসরণ করুন। প্রতিটি পাঠের সাথে Playground এ প্র্যাকটিস করুন।
              </p>
            </div>

            <div className="animate-in">
              <h3 className="text-xl font-bold mb-2">৫. সমস্যা সমাধান করুন এবং অনুশীলন করুন</h3>
              <p className="text-white/90">
                <Link href="/problems" className="underline hover:text-white/70">সমস্যা সমাধান পেজে</Link> গিয়ে বিভিন্ন ধরনের সমস্যা সমাধান করে আপনার দক্ষতা পরীক্ষা করুন।
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm">
              💡 টিপস: নিয়মিত প্র্যাকটিস করুন এবং স্ট্যাক ওভারফ্লো বা কমিউনিটিতে প্রশ্ন জিজ্ঞাসা করতে ভয় পাবেন না।
            </p>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border text-center text-foreground/60">
        <p>সব সম্পদ বাহ্যিক ওয়েবসাইটে হোস্ট করা হয়। আমরা কেবল রেফারেন্স প্রদান করছি।</p>
      </div>
    </div>
  )
}
