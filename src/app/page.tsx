'use client'

import { useEffect, useRef, useState } from 'react'
import { Instagram, ChevronDown, Heart, X } from 'lucide-react'

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

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCake, setSelectedCake] = useState<typeof torten[0] | null>(null)
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

  const openCake = (cake: typeof torten[0]) => {
    setSelectedCake(cake)
    document.body.style.overflow = 'hidden'
  }

  const closeCake = () => {
    setSelectedCake(null)
    document.body.style.overflow = 'auto'
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/nathalies-tortenwelt.png"
            alt=""
            className="w-full h-full object-cover opacity-25"
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
              <h1 className="font-great-vibes text-6xl md:text-7xl lg:text-8xl text-rose-800 mb-3 tracking-wide">
                Nathalies Tortenwelt
              </h1>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center md:justify-start gap-3 my-5">
                <span className="w-20 md:w-28 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                <span className="w-20 md:w-28 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
              </div>

              {/* Tagline mit eleganter Schrift - GRÖSSER */}
              <p className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-rose-700/90 font-semibold italic mb-3">
                Handgemachte Torten mit Liebe
              </p>
              <p className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-rose-700 font-bold max-w-lg">
                Jede Torte ein Unikat, gebacken mit Herz und Seele
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToGallery}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 text-rose-700 hover:text-rose-800 transition-colors cursor-pointer group"
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
            <h2 className="font-great-vibes text-5xl md:text-6xl lg:text-7xl text-rose-900 mb-4">
              Meine Kreationen
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-16 h-px bg-rose-300/60" />
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <span className="w-16 h-px bg-rose-300/60" />
            </div>
            <p className="font-cormorant text-2xl md:text-3xl text-rose-700/80 max-w-xl mx-auto">
              Klicke auf eine Torte, um mehr zu erfahren
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {torten.map((torte, index) => (
              <div
                key={index}
                onClick={() => openCake(torte)}
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-5 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 md:hover:-translate-y-4 border border-rose-100/50 cursor-pointer"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-200/0 to-amber-200/0 group-hover:from-rose-200/20 group-hover:to-amber-200/20 transition-all duration-500" />
                
                {/* Cake Image Container */}
                <div className="relative w-full aspect-square mb-4 overflow-visible">
                  {/* Background gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-50/40 to-amber-50/40 group-hover:from-rose-100/60 group-hover:to-amber-50/60 transition-all duration-500" />
                  
                  {/* Cake Image */}
                  <div className="transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/${torte.file}`}
                      alt={torte.name}
                      className="w-full h-full object-contain p-4 md:p-6 drop-shadow-lg"
                    />
                  </div>
                </div>
                
                {/* Cake Name - GRÖSSER */}
                <h3 className="font-cormorant text-2xl md:text-3xl text-rose-800 text-center group-hover:text-rose-900 transition-colors duration-300 relative z-10 font-semibold">
                  {torte.name}
                </h3>

                {/* Klick-Hinweis */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-rose-500 text-sm font-medium">Klicken für Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal für Torte */}
      {selectedCake && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeCake}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button 
                onClick={closeCake}
                className="flex items-center gap-2 bg-rose-100 hover:bg-rose-200 text-rose-700 px-4 py-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6 font-bold" />
                <span className="font-semibold">Verkleinern</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Bild */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50">
                <div className="relative w-full max-w-md aspect-square">
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
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                  <span className="text-rose-400 font-medium">Nathalies Tortenwelt</span>
                </div>
                
                <h2 className="font-great-vibes text-4xl md:text-5xl text-rose-800 mb-6">
                  {selectedCake.name}
                </h2>
                
                <p className="font-cormorant text-xl md:text-2xl text-rose-700 leading-relaxed mb-8">
                  {selectedCake.description}
                </p>

                <div className="border-t border-rose-100 pt-6">
                  <p className="font-cormorant text-lg text-rose-600 italic">
                    Interessiert? Kontaktiere mich auf Instagram für eine Beratung und Bestellung!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instagram Section */}
      <section className="py-20 md:py-28 px-4 md:px-6 bg-gradient-to-b from-transparent via-rose-100/40 to-rose-100/60">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-rose-300/60" />
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
              <span className="w-10 h-px bg-rose-300/60" />
            </div>
          </div>

          <h2 className="font-great-vibes text-5xl md:text-6xl lg:text-7xl text-rose-900 mb-5">
            Folge mir auf Instagram
          </h2>
          <p className="font-cormorant text-2xl md:text-3xl text-rose-700/80 mb-12 md:mb-14 max-w-md mx-auto">
            Lass dich täglich inspirieren und entdecke meine neuesten Kreationen
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
            {/* QR Code */}
            <div className="group bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
      <footer className="py-10 md:py-12 px-4 bg-rose-100/40 border-t border-rose-200/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          </div>
          <p className="font-great-vibes text-3xl md:text-4xl text-rose-800 mb-2">
            Nathalies Tortenwelt
          </p>
          <p className="font-cormorant text-lg text-rose-600/70">
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
      `}</style>
    </div>
  )
}
