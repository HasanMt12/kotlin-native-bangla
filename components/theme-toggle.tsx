'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { setTheme } from '@/lib/progress'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const dark = document.documentElement.classList.contains('dark')
    setIsDark(dark)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const newIsDark = !isDark

    if (newIsDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    setIsDark(newIsDark)
    setTheme(newIsDark ? 'dark' : 'light')
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      title={isDark ? 'দিনের মোড' : 'রাতের মোড'}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.828-2.828a2 2 0 112.828-2.828l2.828 2.828a2 2 0 11-2.828 2.828zM2.05 9.536a1 1 0 11-1.414-1.414l1.414 1.414zm10 2.828l2.828 2.828a2 2 0 11-2.828 2.828l-2.828-2.828a2 2 0 112.828-2.828zM2.464 4.464a2 2 0 112.828-2.828l-2.828 2.828zm10 2.828l2.828-2.828a1 1 0 11-1.414-1.414l-2.828 2.828a1 1 0 111.414 1.414z" clipRule="evenodd" />
        </svg>
      )}
    </Button>
  )
}
