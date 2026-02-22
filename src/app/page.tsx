'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Instagram, ChevronDown, Heart, X, ChevronUp, Sun, Moon, Cake, Sparkles } from 'lucide-react'

const torten = [
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

// Quiz Fragen
const quizQuestions = [
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
      { text: "Klassisch & Eleganta", cake: "Schwarzwälder Kirschtorte" },
    ]
  },
]

// Seasonal Themes
type Season = 'default' | 'valentine' | 'easter' | 'christmas'

const getSeason = (): Season => {
  const now = new Date()
  const month = now.getMonth()
  const day = now.getDate()
  
  // Valentine (Feb 1-14)
  if (month === 1 && day <= 14) return 'valentine'
  // Easter (March/April - approximated)
  if (month === 2 || month === 3) return 'easter'
  // Christmas (December)
  if (month === 11) return 'christmas'
  
  return 'default'
}

const seasonConfig = {
  default: {
    name: 'Klassisch',
    colors: {
      primary: 'rose',
      secondary: 'amber',
      accent: 'pink',
    },
    decorations: [] as string[],
    greeting: 'Willkommen!',
  },
  valentine: {
    name: 'Valentinstag',
    colors: {
      primary: 'rose',
      secondary: 'pink',
      accent: 'red',
    },
    decorations: ['💕', '❤️', '💘', '🌹', '💗'],
    greeting: 'Alles Liebe! 💕',
  },
  easter: {
    name: 'Ostern',
    colors: {
      primary: 'yellow',
      secondary: 'green',
      accent: 'pink',
    },
    decorations: ['🐰', '🥚', '🌸', '🐥', '🌷'],
    greeting: 'Frohe Ostern! 🐰',
  },
  christmas: {
    name: 'Weihnachten',
    colors: {
      primary: 'red',
      secondary: 'green',
      accent: 'gold',
    },
    decorations: ['🎄', '⭐', '🎅', '🎁', '❄️'],
    greeting: 'Frohe Weihnachten! 🎄',
  },
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCake, setSelectedCake] = useState<typeof torten[0] | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  // Mouse Trail
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number; id: number }[]>([])
  
  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const [quizResult, setQuizResult] = useState<typeof torten[0] | null>(null)
  
  // Seasonal Theme
  const [season, setSeason] = useState<Season>('default')
  
  // Audio Context für Sound-Effekte
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Set season
    setSeason(getSeason())
    
    // Loading Animation
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Initial visibility
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowBackToTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode) {
        setDarkMode(savedMode === 'true')
      }
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
      clearTimeout(loadTimer)
    }
  }, [])

  // Mouse Trail Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newHeart = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      }
      setMouseTrail(prev => [...prev.slice(-15), newHeart])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Remove old hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setMouseTrail(prev => prev.slice(-10))
    }, 100)
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

  // Sound Effect - "Mjam"
  const playMjamSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      
      // Create a fun "Mjam" sound
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
    } catch (e) {
      // Audio not supported
      console.log('Audio not supported')
    }
  }, [])

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openCake = (cake: typeof torten[0]) => {
    setSelectedCake(cake)
    document.body.style.overflow = 'hidden'
    playMjamSound()
  }

  const closeCake = () => {
    setSelectedCake(null)
    document.body.style.overflow = 'auto'
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
      // Calculate result - most frequent cake
      const counts = newAnswers.reduce((acc, cake) => {
        acc[cake] = (acc[cake] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      const result = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      const foundCake = torten.find(t => t.name === result)
      setQuizResult(foundCake || torten[0])
      playMjamSound()
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setQuizAnswers([])
    setQuizResult(null)
  }

  const currentSeason = seasonConfig[season]

  // Loading Screen
  if (isLoading) {
    return (
      <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-${currentSeason.colors.primary}-100 to-${currentSeason.colors.secondary}-50`}>
        <div className="text-center animate-fade-in">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 animate-bounce-slow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Loading"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className={`font-great-vibes text-3xl md:text-4xl text-${currentSeason.colors.primary}-800 mb-2`}>
            Nathalies Tortenwelt
          </h1>
          <p className="font-cormorant text-xl mb-4 text-rose-600">{currentSeason.greeting}</p>
          <div className="flex justify-center gap-2">
            <span className={`w-3 h-3 bg-${currentSeason.colors.primary}-400 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></span>
            <span className={`w-3 h-3 bg-${currentSeason.colors.primary}-400 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></span>
            <span className={`w-3 h-3 bg-${currentSeason.colors.primary}-400 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
        <style jsx global>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          .animate-bounce-slow {
            animation: bounce 2s infinite;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-rose-50 via-amber-50/20 to-rose-50/30'} overflow-x-hidden`}>
      
      {/* Mouse Trail Hearts */}
      {mouseTrail.map((heart, index) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-[100] animate-heart-fade"
          style={{
            left: heart.x - 10,
            top: heart.y - 10,
            opacity: 1 - (index * 0.05),
            transform: `scale(${1 - index * 0.05})`,
          }}
        >
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
        </div>
      ))}
      
      {/* Seasonal Decorations */}
      {currentSeason.decorations.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {currentSeason.decorations.map((emoji, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-float-slow opacity-30"
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
      <div className={`fixed inset-0 z-[90] pointer-events-none bg-gradient-to-b from-rose-100 to-amber-50 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Fixed Instagram Button - rechts am Rand */}
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
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
        aria-label="Dark Mode Toggle"
      >
        {darkMode ? <Sun className="w-6 h-6 md:w-7 md:h-7" /> : <Moon className="w-6 h-6 md:w-7 md:h-7" />}
      </button>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 md:right-6 bottom-24 z-50 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 bg-rose-500 text-white ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Back to Top"
      >
        <ChevronUp className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Parallax Floating Cakes */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {torten.slice(0, 5).map((torte, index) => (
          <div
            key={index}
            className="absolute opacity-10 transition-transform duration-100"
            style={{
              left: `${5 + index * 18}%`,
              top: `${10 + (index % 3) * 30}%`,
              transform: `translateY(${scrollY * (0.1 + index * 0.05)}px) rotate(${scrollY * 0.02}deg)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/${torte.file}`}
              alt=""
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
        ))}
      </div>
      
      {/* Fullscreen Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Vollbild Hintergrund-Logo */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `scale(1.05) translateY(${scrollY * 0.2}px)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/nathalies-tortenwelt.png"
            alt=""
            className={`w-full h-full object-cover transition-opacity duration-500 ${darkMode ? 'opacity-10' : 'opacity-25'}`}
          />
        </div>

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 z-10 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900/80' : 'bg-gradient-to-b from-rose-50/60 via-transparent to-rose-50/80'}`} />

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div 
            className={`absolute top-[15%] left-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-rose-900/30' : 'bg-rose-300/30'}`}
            style={{ transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px)` }}
          />
          <div 
            className={`absolute top-[25%] right-[15%] w-28 h-28 md:w-40 md:h-40 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-amber-900/25' : 'bg-amber-300/25'}`}
            style={{ transform: `translateY(${Math.cos(scrollY * 0.01) * 25}px)`, animationDelay: '1s' }}
          />
          <div 
            className={`absolute bottom-[30%] left-[20%] w-20 h-20 md:w-28 md:h-28 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-purple-900/25' : 'bg-pink-300/25'}`}
            style={{ transform: `translateY(${Math.sin(scrollY * 0.015) * 15}px)`, animationDelay: '0.5s' }}
          />
          <div 
            className={`absolute bottom-[20%] right-[10%] w-24 h-24 md:w-36 md:h-36 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-rose-800/30' : 'bg-rose-200/30'}`}
            style={{ transform: `translateY(${Math.cos(scrollY * 0.012) * 20}px)`, animationDelay: '1.5s' }}
          />
        </div>

        {/* Main Content - Logo NEBEN Text */}
        <div 
          className={`relative z-30 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            
            {/* Schwebendes Logo - GROß */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] flex-shrink-0 animate-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Nathalies Tortenwelt Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              {/* Name mit eleganter Schrift - GRÖSSER */}
              <h1 className={`font-great-vibes text-6xl md:text-7xl lg:text-8xl mb-3 tracking-wide transition-colors duration-500 ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
                Nathalies Tortenwelt
              </h1>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center md:justify-start gap-3 my-5">
                <span className="w-20 md:w-28 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
                <Heart className={`w-6 h-6 transition-colors duration-500 ${darkMode ? 'text-rose-400' : 'text-rose-400'} fill-rose-400`} />
                <span className="w-20 md:w-28 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
              </div>

              {/* Tagline mit eleganter Schrift - GRÖSSER */}
              <p className={`font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold italic mb-3 transition-colors duration-500 ${darkMode ? 'text-rose-200/90' : 'text-rose-700/90'}`}>
                Handgemachte Torten mit Liebe
              </p>
              <p className={`font-cormorant text-2xl md:text-3xl lg:text-4xl font-bold max-w-lg transition-colors duration-500 ${darkMode ? 'text-rose-200' : 'text-rose-700'}`}>
                Jede Torte ein Unikat, gebacken mit Herz und Seele
              </p>
              
              {/* Seasonal Greeting */}
              {season !== 'default' && (
                <p className={`mt-4 font-cormorant text-xl italic ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                  ✨ {currentSeason.greeting}
                </p>
              )}
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

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 md:py-28 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title - GRÖSSER */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className={`font-great-vibes text-5xl md:text-6xl lg:text-7xl mb-4 transition-colors duration-500 ${darkMode ? 'text-rose-300' : 'text-rose-900'}`}>
              Meine Kreationen
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-16 h-px bg-rose-300/60" />
              <Heart className={`w-5 h-5 transition-colors duration-500 ${darkMode ? 'text-rose-500' : 'text-rose-400'} fill-current`} />
              <span className="w-16 h-px bg-rose-300/60" />
            </div>
            <p className={`font-cormorant text-2xl md:text-3xl max-w-xl mx-auto transition-colors duration-500 ${darkMode ? 'text-rose-200/80' : 'text-rose-700/80'}`}>
              Klicke auf eine Torte, um mehr zu erfahren
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {torten.map((torte, index) => (
              <div
                key={index}
                onClick={() => openCake(torte)}
                className={`group relative backdrop-blur-sm rounded-3xl p-5 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 md:hover:-translate-y-4 border cursor-pointer ${darkMode ? 'bg-gray-800/70 border-gray-700/50 hover:border-rose-500/30' : 'bg-white/70 border-rose-100/50 hover:border-rose-300/50'}`}
                style={{ perspective: '1000px' }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${darkMode ? 'group-hover:from-rose-900/20 group-hover:to-amber-900/20' : 'group-hover:from-rose-200/20 group-hover:to-amber-200/20'} bg-gradient-to-br from-transparent to-transparent`} />
                
                {/* Cake Image Container with 3D Effect */}
                <div 
                  className="relative w-full aspect-square mb-4 overflow-visible transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-3"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(0deg) rotateY(0deg)',
                  }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-700/40 to-gray-600/40' : 'bg-gradient-to-br from-rose-50/40 to-amber-50/40'}`} />
                  
                  {/* Cake Image */}
                  <div className="transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/${torte.file}`}
                      alt={torte.name}
                      className="w-full h-full object-contain p-4 md:p-6 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
                      style={{ 
                        transform: 'translateZ(20px)',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                  </div>
                </div>
                
                {/* Cake Name - GRÖSSER */}
                <h3 className={`font-cormorant text-2xl md:text-3xl text-center transition-colors duration-300 relative z-10 font-semibold ${darkMode ? 'text-rose-200 group-hover:text-rose-100' : 'text-rose-800 group-hover:text-rose-900'}`}>
                  {torte.name}
                </h3>

                {/* Klick-Hinweis */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`text-sm font-medium ${darkMode ? 'text-rose-400' : 'text-rose-500'}`}>Klicken für Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button 
                onClick={closeCake}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-rose-300' : 'bg-rose-100 hover:bg-rose-200 text-rose-700'}`}
              >
                <X className="w-6 h-6 font-bold" />
                <span className="font-semibold">Verkleinern</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Bild */}
              <div className={`w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-rose-50 to-amber-50'}`}>
                <div className="relative w-full max-w-md aspect-square animate-cake-bounce">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/${selectedCake.file}`}
                    alt={selectedCake.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Beschreibung */}
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

                <div className={`pt-6 ${darkMode ? 'border-gray-700' : 'border-rose-100'} border-t`}>
                  <p className={`font-cormorant text-lg italic ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                    Interessiert? Kontaktiere mich auf Instagram für eine Beratung und Bestellung!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      <section className={`py-20 md:py-28 px-4 md:px-6 ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-b from-rose-100/40 to-amber-100/40'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className={`font-great-vibes text-5xl md:text-6xl lg:text-7xl mb-4 transition-colors duration-500 ${darkMode ? 'text-rose-300' : 'text-rose-900'}`}>
              Welche Torte passt zu dir?
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-16 h-px bg-rose-300/60" />
              <Sparkles className={`w-6 h-6 ${darkMode ? 'text-rose-500' : 'text-rose-400'}`} />
              <span className="w-16 h-px bg-rose-300/60" />
            </div>
            <p className={`font-cormorant text-2xl md:text-3xl max-w-xl mx-auto transition-colors duration-500 ${darkMode ? 'text-rose-200/80' : 'text-rose-700/80'}`}>
              Finde deine perfekte Traum-Torte!
            </p>
          </div>

          <div className={`rounded-3xl p-6 md:p-10 shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {!quizStarted && !quizResult ? (
              // Start Screen
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
              // Result Screen
              <div className="text-center">
                <div className="text-4xl mb-4">🎉 Deine perfekte Torte! 🎉</div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 animate-cake-bounce">
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
              // Question Screen
              <div>
                {/* Progress */}
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
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-102 ${
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

      {/* Instagram Section */}
      <section className={`py-20 md:py-28 px-4 md:px-6 ${darkMode ? 'bg-gray-900/50' : 'bg-gradient-to-b from-transparent via-rose-100/40 to-rose-100/60'}`}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-rose-300/60" />
              <Heart className={`w-6 h-6 ${darkMode ? 'text-rose-500' : 'text-rose-400'} fill-current`} />
              <span className="w-10 h-px bg-rose-300/60" />
            </div>
          </div>

          <h2 className={`font-great-vibes text-5xl md:text-6xl lg:text-7xl mb-5 transition-colors duration-500 ${darkMode ? 'text-rose-300' : 'text-rose-900'}`}>
            Folge mir auf Instagram
          </h2>
          <p className={`font-cormorant text-2xl md:text-3xl mb-12 md:mb-14 max-w-md mx-auto transition-colors duration-500 ${darkMode ? 'text-rose-200/80' : 'text-rose-700/80'}`}>
            Lass dich täglich inspirieren und entdecke meine neuesten Kreationen
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
            {/* QR Code */}
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

            {/* Instagram Link */}
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

      {/* Footer */}
      <footer className={`py-10 md:py-12 px-4 border-t transition-colors duration-500 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-rose-100/40 border-rose-200/30'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className={`w-5 h-5 ${darkMode ? 'text-rose-500' : 'text-rose-400'} fill-current`} />
          </div>
          <p className={`font-great-vibes text-3xl md:text-4xl mb-2 transition-colors duration-500 ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>
            Nathalies Tortenwelt
          </p>
          <p className={`font-cormorant text-lg transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-rose-600/70'}`}>
            © {new Date().getFullYear()} Alle Rechte vorbehalten
          </p>
        </div>
      </footer>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        @keyframes modal-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
        }
        
        @keyframes heart-fade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
          }
        }
        .animate-heart-fade {
          animation: heart-fade 0.8s ease-out forwards;
        }
        
        @keyframes cake-bounce {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.05) rotate(-2deg);
          }
          50% {
            transform: scale(1.1) rotate(0deg);
          }
          75% {
            transform: scale(1.05) rotate(2deg);
          }
        }
        .animate-cake-bounce {
          animation: cake-bounce 2s ease-in-out infinite;
        }
        
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        .hover\\:rotate-y-12:hover {
          transform: perspective(1000px) rotateY(12deg) rotateX(3deg);
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}
