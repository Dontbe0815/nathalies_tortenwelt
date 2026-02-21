'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Instagram, ChevronDown, Heart } from 'lucide-react'

const torten = [
  { name: 'Cappuccino Nuss Torte', file: 'Cappuccino Nuss Torte.png' },
  { name: 'Erdbeer Torte', file: 'Erdbeer Torte.png' },
  { name: 'Himbeer Torte', file: 'Himbeer Torte.png' },
  { name: 'Käse Sahne Torte mit Fondantdecke', file: 'Käse Sahne Torte mit Fondantdecke.png' },
  { name: 'Marzipan Torte', file: 'Marzipan Torte.png' },
  { name: 'Schoko Bananen Torte', file: 'Schoko Bananen Torte.png' },
  { name: 'Schwarzwälder Kirschtorte', file: 'Schwarzwälder Kirschtorte.png' },
]

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCake, setActiveCake] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50/20 to-rose-50/30 overflow-x-hidden">
      
      {/* Fullscreen Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Vollbild Hintergrund-Logo */}
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `scale(1.05) translateY(${scrollY * 0.2}px)` }}
        >
          <Image
            src="/images/nathalies tortenwelt.png"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/60 via-transparent to-rose-50/80 z-10" />

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div 
            className="absolute top-[15%] left-[10%] w-24 h-24 md:w-32 md:h-32 bg-rose-300/30 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px)` }}
          />
          <div 
            className="absolute top-[25%] right-[15%] w-28 h-28 md:w-40 md:h-40 bg-amber-300/25 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${Math.cos(scrollY * 0.01) * 25}px)`, animationDelay: '1s' }}
          />
          <div 
            className="absolute bottom-[30%] left-[20%] w-20 h-20 md:w-28 md:h-28 bg-pink-300/25 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${Math.sin(scrollY * 0.015) * 15}px)`, animationDelay: '0.5s' }}
          />
          <div 
            className="absolute bottom-[20%] right-[10%] w-24 h-24 md:w-36 md:h-36 bg-rose-200/30 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${Math.cos(scrollY * 0.012) * 20}px)`, animationDelay: '1.5s' }}
          />
        </div>

        {/* Main Content */}
        <div 
          className={`relative z-30 text-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          {/* Schwebendes Logo */}
          <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 mx-auto mb-8 animate-float">
            <Image
              src="/images/logo.png"
              alt="Nathalies Tortenwelt Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Name mit eleganter Schrift */}
          <h1 className="font-great-vibes text-5xl md:text-6xl lg:text-7xl text-rose-800 mb-2 tracking-wide">
            Nathalies Tortenwelt
          </h1>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <span className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          {/* Tagline mit eleganter Schrift */}
          <p className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-rose-700/90 font-medium italic mb-2">
            Handgemachte Torten mit Liebe
          </p>
          <p className="font-cormorant text-lg md:text-xl text-rose-600/70 max-w-md mx-auto">
            Jede Torte ein Unikat, gebacken mit Herz und Seele
          </p>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToGallery}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-rose-600/70 hover:text-rose-700 transition-colors cursor-pointer group"
        >
          <span className="font-cormorant text-base font-medium tracking-wide">Entdecken</span>
          <ChevronDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
        </button>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-great-vibes text-4xl md:text-5xl lg:text-6xl text-rose-900 mb-3">
              Meine Kreationen
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-rose-300/60" />
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span className="w-12 h-px bg-rose-300/60" />
            </div>
            <p className="font-cormorant text-xl md:text-2xl text-rose-700/80 max-w-lg mx-auto">
              Jede Torte wird mit frischen Zutaten und viel Liebe zum Detail handgefertigt
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            {torten.map((torte, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 md:hover:-translate-y-4 border border-rose-100/50"
                onMouseEnter={() => setActiveCake(index)}
                onMouseLeave={() => setActiveCake(null)}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-200/0 to-amber-200/0 group-hover:from-rose-200/20 group-hover:to-amber-200/20 transition-all duration-500`} />
                
                {/* Cake Image Container */}
                <div className="relative w-full aspect-square mb-3 md:mb-4 overflow-visible">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${activeCake === index ? 'bg-gradient-to-br from-rose-100/60 to-amber-50/60' : 'bg-gradient-to-br from-rose-50/40 to-amber-50/40'}`} />
                  
                  {/* Floating animation on hover */}
                  <div className={`transition-transform duration-500 ${activeCake === index ? 'scale-110 -translate-y-2' : 'scale-100'}`}>
                    <Image
                      src={`/images/${torte.file}`}
                      alt={torte.name}
                      fill
                      className="object-contain p-3 md:p-5 drop-shadow-lg"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
                
                {/* Cake Name */}
                <h3 className="font-cormorant text-xl md:text-2xl text-rose-800 text-center group-hover:text-rose-900 transition-colors duration-300 relative z-10 font-semibold">
                  {torte.name}
                </h3>

                {/* Decorative heart on hover */}
                <div className={`absolute top-3 right-3 transition-all duration-300 ${activeCake === index ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-rose-100/40 to-rose-100/60">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-rose-300/60" />
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <span className="w-8 h-px bg-rose-300/60" />
            </div>
          </div>

          <h2 className="font-great-vibes text-4xl md:text-5xl lg:text-6xl text-rose-900 mb-4">
            Folge mir auf Instagram
          </h2>
          <p className="font-cormorant text-xl md:text-2xl text-rose-700/80 mb-10 md:mb-12 max-w-md mx-auto">
            Lass dich täglich inspirieren und entdecke meine neuesten Kreationen
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* QR Code */}
            <div className="group bg-white p-5 md:p-6 rounded-3xl shadow-xl border border-rose-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-44 h-44 md:w-52 md:h-52">
                <Image
                  src="/images/qr.png"
                  alt="Instagram QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Instagram Link */}
            <a
              href="https://instagram.com/nathalies.tortenwelt"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white px-8 md:px-10 py-4 md:py-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Instagram className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-cormorant text-xl md:text-2xl font-semibold">@nathalies.tortenwelt</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-4 bg-rose-100/40 border-t border-rose-200/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </div>
          <p className="font-great-vibes text-2xl md:text-3xl text-rose-800 mb-2">
            Nathalies Tortenwelt
          </p>
          <p className="font-cormorant text-rose-600/70">
            © {new Date().getFullYear()} Alle Rechte vorbehalten
          </p>
        </div>
      </footer>

      {/* Custom Animation Styles */}
      <style jsx global>{`
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
      `}</style>
    </div>
  )
}
