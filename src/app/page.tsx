'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Instagram, ChevronDown, Heart, X, ChevronUp, Sun, Moon, Sparkles, Share2, MessageCircle, Facebook, Volume2, VolumeX, Calendar } from 'lucide-react'

interface Torte {
  name: string
  file: string
  description: string
}

const torten: Torte[] = [
  { name: 'Cappuccino Nuss Torte', file: 'cappuccino-nuss-torte.png', description: 'Eine köstliche Kombination aus feinem Cappuccino und knackigen Nüssen. Ein Genuss für Kaffee-Liebhaber!' },
  { name: 'Erdbeer Torte', file: 'erdbeer-torte.png', description: 'Fruchtige Frische mit saftigen Erdbeeren auf cremiger Basis. Perfekt für den Sommer!' },
  { name: 'Himbeer Torte', file: 'himbeer-torte.png', description: 'Intensiver Himbeergeschmack mit einer perfekten Balance aus Süße und Säure.' },
  { name: 'Käse Sahne Torte mit Fondantdecke', file: 'kaese-sahne-torte.png', description: 'Cremige Käsesahne unter einer wunderschönen Fondantdecke. Ein wahrer Blickfang!' },
  { name: 'Marzipan Torte', file: 'marzipan-torte.png', description: 'Für Marzipan-Liebhaber: Feinstes Marzipan in perfekter Harmonie mit cremiger Füllung.' },
  { name: 'Schoko Bananen Torte', file: 'schoko-bananen-torte.png', description: 'Die klassische Kombination aus Schokolade und Banane - einfach unwiderstehlich!' },
  { name: 'Schwarzwälder Kirschtorte', file: 'schwarzwaelder-kirschtorte.png', description: 'Der deutsche Klassiker: Schokolade, Kirschen und Sahne in perfekter Harmonie.' },
  { name: 'Nutella Torte', file: 'nutella.png', description: 'Für alle Nutella-Fans: Cremig-nussiger Schoko-Genuss pur!' },
  { name: 'Oreo Torte', file: 'oreo.png', description: 'Knusprige Oreo-Kekse treffen auf cremige Schokolade. Ein Traum für Keks-Liebhaber!' },
  { name: 'Wunsch Torte', file: 'wunsch.png', description: 'Deine Torte, deine Wünsche! Gemeinsam kreieren wir dein persönliches Traumstück.' },
  { name: 'Überraschungs Torte', file: 'mystery.png', description: 'Lass dich überraschen! Eine einzigartige Kreation, die jedes Mal neu begeistert.' },
]

interface QuizQuestion {
  question: string
  answers: Array<{ text: string; cake: string }>
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Wie sieht dein perfekter Sonntag aus?",
    answers: [
      { text: "Gemütlich mit Kaffee und einem Buch", cake: "Cappuccino Nuss Torte" },
      { text: "Brunch mit Freunden", cake: "Käse Sahne Torte mit Fondantdecke" },
      { text: "Schokolade und Netflix", cake: "Nutella Torte" },
      { text: "Etwas Neues ausprobieren", cake: "Überraschungs Torte" },
    ]
  },
  {
    question: "Welche Farbe spricht dich am meisten an?",
    answers: [
      { text: "Warmes Braun", cake: "Schoko Bananen Torte" },
      { text: "Leuchtendes Rot", cake: "Erdbeer Torte" },
      { text: "Romantisches Rosa", cake: "Himbeer Torte" },
      { text: "Klassisches Schwarz-Weiß", cake: "Schwarzwälder Kirschtorte" },
    ]
  },
  {
    question: "Was ist dein größter Genuss?",
    answers: [
      { text: "Die perfekte Tasse Kaffee", cake: "Cappuccino Nuss Torte" },
      { text: "Fruchtige Frische", cake: "Erdbeer Torte" },
      { text: "Cremige Schokolade", cake: "Nutella Torte" },
      { text: "Knusprige Kekse", cake: "Oreo Torte" },
    ]
  },
  {
    question: "Bei welchem Anlass möchtest du deine Traum-Torte genießen?",
    answers: [
      { text: "Geburtstag", cake: "Käse Sahne Torte mit Fondantdecke" },
      { text: "Romantisches Date", cake: "Himbeer Torte" },
      { text: "Feier mit Freunden", cake: "Schwarzwälder Kirschtorte" },
      { text: "Nur für mich alleine", cake: "Schoko Bananen Torte" },
    ]
  },
  {
    question: "Welche Geschmacksrichtung liebst du am meisten?",
    answers: [
      { text: "Schokoladig & Süß", cake: "Nutella Torte" },
      { text: "Fruchtig & Frisch", cake: "Himbeer Torte" },
      { text: "Nussig & Cremig", cake: "Marzipan Torte" },
      { text: "Klassisch & Elegant", cake: "Schwarzwälder Kirschtorte" },
    ]
  },
]

// Torten-Fakten für das Karussell
const tortenFakten: string[] = [
  "Wusstest du? Die Schwarzwälder Kirschtorte wurde 1915 in Bad Godesberg erfunden!",
  "Der weltweite Tortenrekord: Die größte Torte wog über 70 Tonnen!",
  "Vanille ist die beliebteste Tortenfüllung der Welt!",
  "Die älteste Torte der Welt ist über 100 Jahre alt!",
  "In Deutschland werden jährlich über 300 Millionen Torten gegessen!",
]

// Schwebende Zutaten
const floatingIngredients = ['🥚', '🌾', '🥛', '🍫', '🫧', '🍯', '🧈', '🍓', '🥜', '🫐']

type Season = 'default' | 'valentine' | 'easter' | 'christmas'

const getSeason = (): Season => {
  const now = new Date()
  const month = now.getMonth()
  const day = now.getDate()
  
  if (month === 1 && day <= 14) return 'valentine'
  if (month === 2 || month === 3) return 'easter'
  if (month === 11) return 'christmas'
  
  return 'default'
}

// Feiertags-Countdown berechnen
interface HolidayInfo {
  name: string
  emoji: string
  date: Date
}

const getNextHoliday = (): HolidayInfo => {
  const now = new Date()
  const currentYear = now.getFullYear()
  
  // Ostern berechnen (vereinfacht - approximativ)
  const getEasterDate = (year: number): Date => {
    const a = year % 19
    const b = Math.floor(year / 100)
    const c = year % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1
    const day = ((h + l - 7 * m + 114) % 31) + 1
    return new Date(year, month, day)
  }
  
  const holidays: HolidayInfo[] = [
    { name: 'Valentinstag', emoji: '💕', date: new Date(currentYear, 1, 14) },
    { name: 'Ostern', emoji: '🐰', date: getEasterDate(currentYear) },
    { name: 'Weihnachten', emoji: '🎄', date: new Date(currentYear, 11, 25) },
  ]
  
  // Filter holidays that are in the future
  const futureHolidays = holidays.filter(h => h.date > now)
  
  if (futureHolidays.length > 0) {
    return futureHolidays[0]
  }
  
  // If no holidays left this year, return Valentine's of next year
  return { name: 'Valentinstag', emoji: '💕', date: new Date(currentYear + 1, 1, 14) }
}

interface SeasonConfig {
  name: string
  decorations: string[]
  greeting: string
}

const seasonConfig: Record<Season, SeasonConfig> = {
  default: {
    name: 'Klassisch',
    decorations: [],
    greeting: 'Willkommen!',
  },
  valentine: {
    name: 'Valentinstag',
    decorations: ['💕', '❤️', '💘', '🌹', '💗'],
    greeting: 'Alles Liebe! 💕',
  },
  easter: {
    name: 'Ostern',
    decorations: ['🐰', '🥚', '🌸', '🐥', '🌷'],
    greeting: 'Frohe Ostern! 🐰',
  },
  christmas: {
    name: 'Weihnachten',
    decorations: ['🎄', '⭐', '🎅', '🎁', '❄️'],
    greeting: 'Frohe Weihnachten! 🎄',
  },
}

// Konfetti Component
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null
  
  const colors = ['#f472b6', '#fb923c', '#fbbf24', '#a3e635', '#38bdf8', '#c084fc']
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {Array.from({ length: 100 }, (_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 2
        const duration = 2 + Math.random() * 3
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = 5 + Math.random() * 10
        
        return (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${left}%`,
              top: '-20px',
              width: size,
              height: size * 0.6,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        )
      })}
    </div>
  )
}

// Typewriter Component
const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return <span>{displayText}<span className="animate-blink">|</span></span>
}

// Torte mit Augen Component
const CakeWithEyes = ({ darkMode, mousePosition }: { darkMode: boolean; mousePosition: { x: number; y: number } }) => {
  const cakeRef = useRef<HTMLDivElement>(null)
  const [eyeAngle, setEyeAngle] = useState({ left: 0, right: 0 })
  
  useEffect(() => {
    if (cakeRef.current) {
      const rect = cakeRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const angleLeft = Math.atan2(mousePosition.y - centerY, mousePosition.x - centerX - 10)
      const angleRight = Math.atan2(mousePosition.y - centerY, mousePosition.x - centerX + 10)
      
      setEyeAngle({ left: angleLeft, right: angleRight })
    }
  }, [mousePosition])
  
  const pupilOffset = 3
  
  return (
    <div 
      ref={cakeRef}
      className={`fixed bottom-24 left-4 md:left-6 z-40 cursor-pointer transition-transform hover:scale-110 ${darkMode ? 'opacity-60 hover:opacity-80' : 'opacity-70 hover:opacity-90'}`}
    >
      {/* Cake Body */}
      <div className="relative">
        {/* Cake layers */}
        <div className="w-16 h-6 md:w-20 md:h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-lg shadow-md" />
        <div className="w-18 h-5 md:w-22 md:h-7 bg-gradient-to-b from-rose-300 to-rose-400 -mt-0.5 rounded-t-lg shadow-md" style={{ marginLeft: '-4px', marginRight: '-4px' }} />
        <div className="w-20 h-6 md:w-24 md:h-8 bg-gradient-to-b from-amber-200 to-amber-300 -mt-0.5 rounded-b-lg shadow-md" style={{ marginLeft: '-6px', marginRight: '-6px' }} />
        
        {/* Frosting drips */}
        <div className="absolute top-0 left-0 right-0 flex justify-around">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-1.5 h-3 bg-pink-200 rounded-b-full"
              style={{ height: `${4 + (i % 3) * 2}px` }}
            />
          ))}
        </div>
        
        {/* Cherry on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="w-4 h-4 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-md">
            <div className="absolute -top-2 left-1/2 w-0.5 h-2 bg-green-600 rounded-full" />
          </div>
        </div>
        
        {/* Face Container */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
          {/* Left Eye */}
          <div className="relative w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-inner flex items-center justify-center border border-gray-200">
            <div 
              className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gray-800 rounded-full transition-transform duration-100"
              style={{
                transform: `translate(${Math.cos(eyeAngle.left) * pupilOffset}px, ${Math.sin(eyeAngle.left) * pupilOffset}px)`
              }}
            />
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
          </div>
          
          {/* Right Eye */}
          <div className="relative w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-inner flex items-center justify-center border border-gray-200">
            <div 
              className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gray-800 rounded-full transition-transform duration-100"
              style={{
                transform: `translate(${Math.cos(eyeAngle.right) * pupilOffset}px, ${Math.sin(eyeAngle.right) * pupilOffset}px)`
              }}
            />
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
        
        {/* Blush */}
        <div className="absolute top-6 left-1 w-2 h-1 bg-pink-300 rounded-full opacity-60" />
        <div className="absolute top-6 right-1 w-2 h-1 bg-pink-300 rounded-full opacity-60" />
        
        {/* Cute smile */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-600 rounded-b-full" />
      </div>
    </div>
  )
}

// Wave Divider Component
const WaveDivider = ({ darkMode, flip = false }: { darkMode: boolean; flip?: boolean }) => {
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''}`} style={{ height: '60px', marginTop: '-1px', marginBottom: '-1px' }}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,30 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,60 L0,60 Z"
          className={`transition-all duration-700 ${darkMode ? 'fill-gray-800/50' : 'fill-rose-100/40'}`}
        />
        <path
          d="M0,40 C200,70 400,10 600,40 C800,70 1000,10 1200,40 L1200,60 L0,60 Z"
          className={`transition-all duration-700 ${darkMode ? 'fill-gray-700/30' : 'fill-amber-100/40'}`}
        />
      </svg>
    </div>
  )
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [selectedCake, setSelectedCake] = useState<Torte | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Confetti State
  const [showConfetti, setShowConfetti] = useState(false)
  
  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const [quizResult, setQuizResult] = useState<Torte | null>(null)
  
  // Seasonal Theme
  const [season, setSeason] = useState<Season>('default')
  
  // Easter Egg
  const [logoClicks, setLogoClicks] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  
  // Audio Context
  const audioContextRef = useRef<AudioContext | null>(null)
  
  // Mouse Position for Cake Eyes
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Torten-Fakten Carousel
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [factFadeIn, setFactFadeIn] = useState(true)
  
  // Hintergrundmusik
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Holiday Countdown
  const [holidayInfo, setHolidayInfo] = useState<HolidayInfo | null>(null)
  const [daysUntilHoliday, setDaysUntilHoliday] = useState(0)

  useEffect(() => {
    setSeason(getSeason())
    
    // Set next holiday
    const holiday = getNextHoliday()
    setHolidayInfo(holiday)
    const now = new Date()
    const diffTime = holiday.date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysUntilHoliday(diffDays)
    
    // Loading Animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    const loadTimer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 1800)

    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowBackToTop(window.scrollY > 500)
      
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setScrollProgress(Math.min(progress, 100))
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)

    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode) {
        setDarkMode(savedMode === 'true')
      }
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(loadTimer)
      clearInterval(progressInterval)
    }
  }, [])

  // Torten-Fakten Carousel Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setFactFadeIn(false)
      setTimeout(() => {
        setCurrentFactIndex(prev => (prev + 1) % tortenFakten.length)
        setFactFadeIn(true)
      }, 500)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(darkMode))
    }
  }, [darkMode])

  const playMjamSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.setValueAtTime(400, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1)
      oscillator.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.2)
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.3)
    } catch {
      console.log('Audio not supported')
    }
  }, [])

  // Hintergrundmusik mit MP3
  const toggleBackgroundMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/background.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
    
    if (isAmbientPlaying) {
      audioRef.current.pause()
      setIsAmbientPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        console.log('Audio playback failed')
      })
      setIsAmbientPlaying(true)
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  const openCake = (cake: Torte) => {
    setSelectedCake(cake)
    playMjamSound()
    triggerConfetti()
  }

  const closeCake = () => {
    setSelectedCake(null)
  }

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (selectedCake) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedCake])

  const toggleDarkMode = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setDarkMode(!darkMode)
      setIsTransitioning(false)
    }, 500)
  }

  // Logo Click Easter Egg
  const handleLogoClick = () => {
    const newCount = logoClicks + 1
    setLogoClicks(newCount)
    
    if (newCount >= 10) {
      setShowEasterEgg(true)
      triggerConfetti()
      playMjamSound()
      setTimeout(() => setShowEasterEgg(false), 5000)
      setLogoClicks(0)
    }
  }

  // Quiz Logic
  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setQuizAnswers([])
    setQuizResult(null)
  }

  const answerQuestion = (cake: string) => {
    const newAnswers = [...quizAnswers, cake]
    setQuizAnswers(newAnswers)
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const counts = newAnswers.reduce((acc, c) => {
        acc[c] = (acc[c] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      const result = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      const foundCake = torten.find(t => t.name === result)
      setQuizResult(foundCake || torten[0])
      playMjamSound()
      triggerConfetti()
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setQuizAnswers([])
    setQuizResult(null)
  }

  // Share Functions
  const shareOnWhatsApp = (cakeName: string) => {
    const text = `Ich habe mir gerade die ${cakeName} bei Nathalies Tortenwelt angesehen! 🎂`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareOnFacebook = (cakeName: string) => {
    const url = 'https://nathalies-tortenwelt.vercel.app'
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(cakeName)}`, '_blank')
  }

  const shareOnPinterest = (cakeName: string) => {
    const url = 'https://nathalies-tortenwelt.vercel.app'
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(cakeName + ' - Nathalies Tortenwelt')}`, '_blank')
  }

  const currentSeason = seasonConfig[season]
  const loadingCakes = torten.slice(0, 5)

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-rose-100 to-amber-50 overflow-hidden">
        {/* Stacking Cakes Animation */}
        <div className="absolute inset-0 flex items-end justify-center pb-20">
          {loadingCakes.map((cake, index) => (
            <div
              key={index}
              className="absolute transition-all duration-500 ease-out"
              style={{
                bottom: loadingProgress > index * 20 ? `${index * 60}px` : '-200px',
                opacity: loadingProgress > index * 20 ? 1 : 0,
                transform: `translateX(${(index - 2) * 80}px) scale(0.4)`,
                zIndex: 10 - index,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${cake.file}`}
                alt=""
                className="w-40 h-40 object-contain drop-shadow-xl"
              />
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64">
          <div className="h-2 bg-rose-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-center mt-3 font-cormorant text-rose-700 text-lg">
            {loadingProgress < 100 ? 'Torten werden gestapelt...' : 'Fertig! 🎂'}
          </p>
        </div>

        {/* Glitzer Effects */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-rose-50 via-amber-50/20 to-rose-50/30'} overflow-x-hidden`}>
      
      {/* Confetti */}
      <Confetti active={showConfetti} />
      
      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 text-center animate-modal-in max-w-md mx-4">
            <div className="text-6xl mb-4">🎉🎂🎉</div>
            <h2 className="font-great-vibes text-4xl text-rose-800 mb-4">
              Geheimnis entdeckt!
            </h2>
            <p className="font-cormorant text-xl text-rose-700 mb-6">
              Du hast das Easter Egg gefunden! Als Belohnung: Ein virtuelles Stück Torte! 🍰
            </p>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white px-8 py-3 rounded-full font-semibold"
            >
              Danke! 💕
            </button>
          </div>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-gray-200/30">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Schwebende Zutaten (Floating Ingredients) - Reduziert für Performance */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        {floatingIngredients.slice(0, 6).map((emoji, i) => {
          const positions = [
            { left: '5%', top: '15%' },
            { left: '15%', top: '70%' },
            { left: '75%', top: '20%' },
            { left: '85%', top: '55%' },
            { left: '55%', top: '10%' },
            { left: '35%', top: '60%' },
          ]
          return (
            <div
              key={i}
              className={`absolute text-3xl md:text-4xl animate-float-ingredient ${darkMode ? 'opacity-10' : 'opacity-15'}`}
              style={{
                left: positions[i].left,
                top: positions[i].top,
                animationDelay: `${i * 1}s`,
                animationDuration: `${15 + i * 2}s`,
                willChange: 'transform',
              }}
            >
              {emoji}
            </div>
          )
        })}
      </div>

      {/* Seasonal Decorations */}
      {currentSeason.decorations.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {currentSeason.decorations.map((emoji, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-float-slow opacity-20"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}

      {/* Loading Overlay Fade Out */}
      <div className={`fixed inset-0 z-[90] pointer-events-none bg-gradient-to-b from-rose-100 to-amber-50 transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Fixed Instagram Button */}
      <a
        href="https://instagram.com/nathalies_tortenwelt"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 bg-gradient-to-b from-pink-500 via-rose-500 to-orange-400 text-white p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden md:block text-xs font-medium writing-vertical">Instagram</span>
      </a>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-500 ${isTransitioning ? 'animate-day-night' : ''} ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
        aria-label="Dark Mode Toggle"
      >
        <div className={`transition-transform duration-500 ${isTransitioning ? 'animate-spin' : ''}`}>
          {darkMode ? <Sun className="w-6 h-6 md:w-7 md:h-7" /> : <Moon className="w-6 h-6 md:w-7 md:h-7" />}
        </div>
      </button>

      {/* Feiertags-Countdown (Holiday Countdown) */}
      {holidayInfo && (
        <div className={`fixed left-1/2 -translate-x-1/2 top-4 z-[60] px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-500 ${darkMode ? 'bg-gray-800/90 text-rose-300' : 'bg-white/90 text-rose-700'}`}>
          <div className="flex items-center gap-2 font-cormorant text-sm md:text-base">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold">
              {holidayInfo.emoji} Noch <span className="text-lg md:text-xl font-bold">{daysUntilHoliday}</span> Tage bis {holidayInfo.name}!
            </span>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 md:right-6 bottom-24 z-50 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 bg-rose-500 text-white ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Back to Top"
      >
        <ChevronUp className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Hintergrundmusik Toggle Button */}
      <button
        onClick={toggleBackgroundMusic}
        className={`fixed right-4 md:right-6 bottom-40 z-50 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 ${isAmbientPlaying ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : darkMode ? 'bg-gray-700 text-rose-300' : 'bg-white text-rose-700'}`}
        aria-label={isAmbientPlaying ? 'Hintergrundmusik ausschalten' : 'Hintergrundmusik einschalten'}
      >
        {isAmbientPlaying ? <Volume2 className="w-6 h-6 md:w-7 md:h-7" /> : <VolumeX className="w-6 h-6 md:w-7 md:h-7" />}
      </button>

      {/* Parallax Floating Cakes - Optimiert für smoother Scroll */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {torten.slice(0, 3).map((torte, index) => (
          <div
            key={index}
            className="absolute opacity-[0.08]"
            style={{
              left: `${15 + index * 25}%`,
              top: `${15 + (index % 2) * 40}%`,
              transform: `translate3d(0, ${scrollY * (0.08 + index * 0.03)}px, 0)`,
              willChange: 'transform',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/${torte.file}`}
              alt=""
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Logo */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            transform: `scale(1.05) translate3d(0, ${scrollY * 0.15}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/nathalies-tortenwelt.png"
            alt=""
            className={`w-full h-full object-cover transition-opacity duration-500 ${darkMode ? 'opacity-10' : 'opacity-25'}`}
          />
        </div>

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 z-10 transition-colors duration-700 ${darkMode ? 'bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900/80' : 'bg-gradient-to-b from-rose-50/60 via-transparent to-rose-50/80'}`} />

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div 
            className={`absolute top-[15%] left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-rose-900/30' : 'bg-rose-300/30'}`}
            style={{ transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px)` }}
          />
          <div 
            className={`absolute top-[25%] right-[15%] w-28 h-28 md:w-40 md:h-40 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-amber-900/25' : 'bg-amber-300/25'}`}
            style={{ transform: `translateY(${Math.cos(scrollY * 0.01) * 25}px)`, animationDelay: '1s' }}
          />
        </div>

        {/* Main Content */}
        <div 
          className={`relative z-30 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            
            {/* Logo with Glitzer */}
            <div 
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] flex-shrink-0 animate-float cursor-pointer group"
              onClick={handleLogoClick}
            >
              {/* Glitzer effects - reduziert für Performance */}
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full animate-sparkle"
                  style={{
                    left: `${20 + (i * 5) % 60}%`,
                    top: `${20 + (i * 7) % 60}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Nathalies Tortenwelt Logo"
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              {logoClicks > 0 && logoClicks < 10 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-rose-500">
                  {10 - logoClicks} mehr...
                </div>
              )}
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h1 className={`font-great-vibes text-6xl md:text-7xl lg:text-8xl mb-3 tracking-wide transition-colors duration-500 ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
                {isVisible && <Typewriter text="Nathalies Tortenwelt" delay={80} />}
              </h1>
              
              <div className="flex items-center justify-center md:justify-start gap-3 my-5">
                <span className="w-20 md:w-28 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
                <Heart className={`w-6 h-6 ${darkMode ? 'text-rose-400' : 'text-rose-400'} fill-rose-400`} />
                <span className="w-20 md:w-28 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
              </div>

              <p className={`font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold italic mb-3 transition-colors duration-500 ${darkMode ? 'text-rose-200/90' : 'text-rose-700/90'}`}>
                Handgemachte Torten mit Liebe
              </p>
              <p className={`font-cormorant text-2xl md:text-3xl lg:text-4xl font-bold max-w-lg transition-colors duration-500 ${darkMode ? 'text-rose-200' : 'text-rose-700'}`}>
                Jede Torte ein Unikat, gebacken mit Herz und Seele
              </p>
              
              {season !== 'default' && (
                <p className={`mt-4 font-cormorant text-xl italic ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                  ✨ {currentSeason.greeting}
                </p>
              )}
            </div>
            
            {/* QR Code - Rechts vom Text (nur Desktop) */}
            <div className={`hidden lg:flex flex-col items-center p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/qr.png"
                alt="Instagram QR Code"
                className="w-28 h-28 object-contain"
              />
              <p className={`text-sm text-center mt-2 font-cormorant font-semibold ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                @nathalies_tortenwelt
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToGallery}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 transition-colors duration-500 cursor-pointer group ${darkMode ? 'text-rose-300 hover:text-rose-200' : 'text-rose-700 hover:text-rose-800'}`}
        >
          <span className="font-cormorant text-xl md:text-2xl font-bold tracking-wide">Entdecken</span>
          <ChevronDown className="w-8 h-8 animate-bounce group-hover:scale-110 transition-transform" />
        </button>
        

      </section>

      {/* Wave Divider: Hero → Gallery */}
      <WaveDivider darkMode={darkMode} />

      {/* Gallery Section */}
      <section 
        ref={galleryRef} 
        className={`py-20 md:py-28 px-4 md:px-6 lg:px-8 transition-all duration-700 ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-b from-rose-100/40 to-amber-100/40'}`}
      >
        <div className="max-w-7xl mx-auto pt-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className={`font-great-vibes text-5xl md:text-6xl lg:text-7xl mb-4 transition-colors duration-500 ${darkMode ? 'text-rose-300' : 'text-rose-900'}`}>
              Meine Kreationen
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-16 h-px bg-rose-300/60" />
              <Heart className={`w-5 h-5 ${darkMode ? 'text-rose-500' : 'text-rose-400'} fill-current`} />
              <span className="w-16 h-px bg-rose-300/60" />
            </div>
            <p className={`font-cormorant text-2xl md:text-3xl max-w-xl mx-auto transition-colors duration-500 ${darkMode ? 'text-rose-200/80' : 'text-rose-700/80'}`}>
              Klicke auf eine Torte, um mehr zu erfahren
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {torten.map((torte, index) => (
              <div
                key={index}
                onClick={() => openCake(torte)}
                className={`group relative backdrop-blur-sm rounded-3xl p-5 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border cursor-pointer ${darkMode ? 'bg-gray-800/70 border-gray-700/50 hover:border-rose-500/30' : 'bg-white/70 border-rose-100/50 hover:border-rose-300/50'}`}
              >
                {/* Glitzer on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-amber-400 rounded-full animate-sparkle"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${10 + (i % 3) * 40}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative w-full aspect-square mb-4 overflow-visible">
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-700/40 to-gray-600/40' : 'bg-gradient-to-br from-rose-50/40 to-amber-50/40'}`} />
                  <div className="transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/${torte.file}`}
                      alt={torte.name}
                      className="w-full h-full object-contain p-4 md:p-6 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
                    />
                  </div>
                </div>
                
                <h3 className={`font-cormorant text-2xl md:text-3xl text-center transition-colors duration-300 relative z-10 font-semibold ${darkMode ? 'text-rose-200 group-hover:text-rose-100' : 'text-rose-800 group-hover:text-rose-900'}`}>
                  {torte.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave Divider: Gallery → Facts */}
      <WaveDivider darkMode={darkMode} flip />

      {/* Torten-Fakten Karussell (Cake Facts Carousel) */}
      <section className={`py-16 md:py-20 px-4 md:px-6 transition-all duration-700 ${darkMode ? 'bg-gray-900/50' : 'bg-gradient-to-b from-amber-100/40 to-rose-100/40'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`font-great-vibes text-4xl md:text-5xl mb-8 ${darkMode ? 'text-rose-300' : 'text-rose-900'}`}>
            Torten-Fakten 🎂
          </h2>
          
          <div className={`relative h-[160px] md:h-[140px] rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-2xl">📚</div>
            <div className="absolute top-4 right-4 text-2xl">💡</div>
            
            <div className="h-full flex flex-col justify-center">
              <p 
                className={`font-cormorant text-xl md:text-2xl lg:text-3xl transition-all duration-500 ${factFadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${darkMode ? 'text-rose-200' : 'text-rose-700'}`}
              >
                {tortenFakten[currentFactIndex]}
              </p>
            </div>
            
            {/* Carousel Indicators - Fixed at bottom */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {tortenFakten.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFactFadeIn(false)
                    setTimeout(() => {
                      setCurrentFactIndex(i)
                      setFactFadeIn(true)
                    }, 300)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentFactIndex 
                      ? 'w-6 bg-rose-500' 
                      : darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Fakt ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider: Facts → Quiz */}
      <WaveDivider darkMode={darkMode} />

      {/* Modal für Torte */}
      {selectedCake && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeCake}
        >
          <div 
            className={`relative rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-modal-in ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={closeCake}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-rose-300' : 'bg-rose-100 hover:bg-rose-200 text-rose-700'}`}
              >
                <X className="w-6 h-6 font-bold" />
                <span className="font-semibold">Verkleinern</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className={`w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-rose-50 to-amber-50'}`}>
                <div className="relative w-full max-w-md aspect-square animate-cake-bounce">
                  {/* Glitzer */}
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-amber-400 rounded-full animate-sparkle"
                      style={{
                        left: `${10 + (i * 10) % 80}%`,
                        top: `${10 + (i * 12) % 80}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/${selectedCake.file}`}
                    alt={selectedCake.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className={`w-6 h-6 ${darkMode ? 'text-rose-500' : 'text-rose-400'} fill-current`} />
                  <span className={`font-medium ${darkMode ? 'text-rose-400' : 'text-rose-400'}`}>Nathalies Tortenwelt</span>
                </div>
                
                <h2 className={`font-great-vibes text-4xl md:text-5xl mb-6 ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
                  {selectedCake.name}
                </h2>
                
                <p className={`font-cormorant text-xl md:text-2xl leading-relaxed mb-8 ${darkMode ? 'text-rose-200' : 'text-rose-700'}`}>
                  {selectedCake.description}
                </p>

                {/* Share Buttons */}
                <div className={`pt-6 mb-6 ${darkMode ? 'border-gray-700' : 'border-rose-100'} border-t`}>
                  <p className={`font-cormorant text-lg mb-4 ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                    Teile diese Torte:
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => shareOnWhatsApp(selectedCake.name)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => shareOnFacebook(selectedCake.name)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </button>
                    <button
                      onClick={() => shareOnPinterest(selectedCake.name)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Pinterest
                    </button>
                  </div>
                </div>

                <div className={`${darkMode ? 'border-gray-700' : 'border-rose-100'} border-t pt-6`}>
                  <p className={`font-cormorant text-lg italic ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                    📱 Kontaktiere mich auf Instagram für Bestellungen!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      <section className={`py-20 md:py-28 px-4 md:px-6 transition-all duration-700 ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-b from-rose-100/40 to-amber-100/40'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`font-great-vibes text-5xl md:text-6xl lg:text-7xl mb-4 ${darkMode ? 'text-rose-300' : 'text-rose-900'}`}>
              Welche Torte passt zu dir?
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-16 h-px bg-rose-300/60" />
              <Sparkles className={`w-6 h-6 ${darkMode ? 'text-rose-500' : 'text-rose-400'}`} />
              <span className="w-16 h-px bg-rose-300/60" />
            </div>
          </div>

          <div className={`rounded-3xl p-6 md:p-10 shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {!quizStarted && !quizResult ? (
              <div className="text-center">
                <div className="text-6xl mb-6">🎂✨🍰</div>
                <h3 className={`font-great-vibes text-3xl md:text-4xl mb-6 ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
                  Entdecke deine Traumsorte!
                </h3>
                <p className={`font-cormorant text-xl mb-8 ${darkMode ? 'text-rose-200' : 'text-rose-700'}`}>
                  Beantworte 5 kurze Fragen und erfahre, welche Torte perfekt zu dir passt.
                </p>
                <button
                  onClick={startQuiz}
                  className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white px-10 py-4 rounded-full font-semibold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Quiz starten! 🎉
                </button>
              </div>
            ) : quizResult ? (
              <div className="text-center">
                <div className="text-4xl mb-4">🎉 Deine perfekte Torte! 🎉</div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 animate-cake-bounce">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-amber-400 rounded-full animate-sparkle"
                      style={{
                        left: `${(i * 10) % 100}%`,
                        top: `${(i * 13) % 100}%`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/${quizResult.file}`}
                    alt={quizResult.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <h3 className={`font-great-vibes text-4xl md:text-5xl mb-4 ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
                  {quizResult.name}
                </h3>
                <p className={`font-cormorant text-xl mb-8 ${darkMode ? 'text-rose-200' : 'text-rose-700'}`}>
                  {quizResult.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://instagram.com/nathalies_tortenwelt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                  >
                    <Instagram className="w-5 h-5" />
                    Jetzt bestellen!
                  </a>
                  <button
                    onClick={resetQuiz}
                    className={`px-8 py-3 rounded-full font-semibold ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Nochmal spielen
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-center gap-2 mb-8">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i < currentQuestion ? 'bg-rose-500' : i === currentQuestion ? 'bg-rose-400' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <h3 className={`font-cormorant text-2xl md:text-3xl text-center mb-8 ${darkMode ? 'text-rose-200' : 'text-rose-800'}`}>
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="grid gap-4">
                  {quizQuestions[currentQuestion].answers.map((answer, i) => (
                    <button
                      key={i}
                      onClick={() => answerQuestion(answer.cake)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 hover:border-rose-400 hover:bg-gray-600 text-gray-200' 
                          : 'bg-gray-50 border-gray-200 hover:border-rose-400 hover:bg-rose-50 text-gray-700'
                      }`}
                    >
                      <span className="font-cormorant text-lg md:text-xl">{answer.text}</span>
                    </button>
                  ))}
                </div>

                <p className={`text-center mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Frage {currentQuestion + 1} von {quizQuestions.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Wave Divider: Quiz → Instagram */}
      <WaveDivider darkMode={darkMode} flip />

      {/* Instagram Section */}
      <section className={`py-20 md:py-28 px-4 md:px-6 transition-all duration-700 ${darkMode ? 'bg-gray-900/50' : 'bg-gradient-to-b from-transparent via-rose-100/40 to-rose-100/60'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-rose-300/60" />
              <Heart className={`w-6 h-6 ${darkMode ? 'text-rose-500' : 'text-rose-400'} fill-current`} />
              <span className="w-10 h-px bg-rose-300/60" />
            </div>
          </div>

          <h2 className={`font-great-vibes text-5xl md:text-6xl lg:text-7xl mb-5 ${darkMode ? 'text-rose-300' : 'text-rose-900'}`}>
            Folge mir auf Instagram
          </h2>
          <p className={`font-cormorant text-2xl md:text-3xl mb-12 md:mb-14 ${darkMode ? 'text-rose-200/80' : 'text-rose-700/80'}`}>
            Lass dich täglich inspirieren und entdecke meine neuesten Kreationen
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
            <div className={`group p-6 md:p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-rose-100/50'}`}>
              <div className="relative w-52 h-52 md:w-60 md:h-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/qr.png"
                  alt="Instagram QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <a
              href="https://instagram.com/nathalies_tortenwelt"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white px-10 md:px-12 py-5 md:py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Instagram className="w-7 h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-cormorant text-2xl md:text-3xl font-semibold">@nathalies_tortenwelt</span>
            </a>
          </div>
        </div>
      </section>

      {/* Wave Divider: Instagram → Footer */}
      <WaveDivider darkMode={darkMode} />

      {/* Footer */}
      <footer className={`py-10 md:py-12 px-4 border-t transition-colors duration-700 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-rose-100/40 border-rose-200/30'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className={`w-5 h-5 ${darkMode ? 'text-rose-500' : 'text-rose-400'} fill-current`} />
          </div>
          <p className={`font-great-vibes text-3xl md:text-4xl mb-2 ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
            Nathalies Tortenwelt
          </p>
          <p className={`font-cormorant text-lg ${darkMode ? 'text-gray-400' : 'text-rose-600/70'}`}>
            © {new Date().getFullYear()} Alle Rechte vorbehalten
          </p>
        </div>
      </footer>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Performance Optimierungen */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* GPU-Beschleunigung für animierte Elemente */
        .animate-float,
        .animate-float-slow,
        .animate-float-ingredient,
        .animate-sparkle,
        .animate-cake-bounce {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateZ(0); }
          50% { transform: translateY(-15px) translateZ(0); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg) translateZ(0); }
          50% { transform: translateY(-20px) rotate(10deg) translateZ(0); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        @keyframes float-ingredient {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) translateZ(0); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg) translateZ(0); 
          }
        }
        .animate-float-ingredient {
          animation: float-ingredient 18s ease-in-out infinite;
        }
        
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }
        
        @keyframes cake-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.03) rotate(-1deg); }
          50% { transform: scale(1.05) rotate(0deg); }
          75% { transform: scale(1.03) rotate(1deg); }
        }
        .animate-cake-bounce {
          animation: cake-bounce 2s ease-in-out infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  )
}
