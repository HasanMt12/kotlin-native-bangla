const STORAGE_KEY = 'kotlin_progress';

export interface Progress {
  completedLessons: string[];
  solvedProblems: string[];
  theme: 'light' | 'dark';
}

export function getProgress(): Progress {
  if (typeof window === 'undefined') {
    return { completedLessons: [], solvedProblems: [], theme: 'light' };
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored 
    ? JSON.parse(stored) 
    : { completedLessons: [], solvedProblems: [], theme: 'light' };
}

export function saveProgress(progress: Progress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markLessonComplete(lessonId: string) {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveProgress(progress);
  }
}

export function markProblemSolved(problemId: string) {
  const progress = getProgress();
  if (!progress.solvedProblems.includes(problemId)) {
    progress.solvedProblems.push(problemId);
    saveProgress(progress);
  }
}

export function setTheme(theme: 'light' | 'dark') {
  const progress = getProgress();
  progress.theme = theme;
  saveProgress(progress);
}
