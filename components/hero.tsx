"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1600&auto=format&fit=crop",
    title: "Coleção Verão",
    description: "Descubra nossas novas peças com cores pastel tranquilizantes",
    cta: "Comprar Agora",
  },
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop",
    title: "Moda Sustentável",
    description: "Roupas ecológicas que fazem bem para você e para o planeta",
    cta: "Saiba Mais",
  },
  {
    image: "https://i.pinimg.com/736x/18/00/a5/1800a5ac91e493ffee12624b6d2cb79e.jpg",
    title: "Ofertas Especiais",
    description: "Descontos por tempo limitado em itens selecionados",
    cta: "Ver Ofertas",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-lg space-y-4 text-center mx-auto"
              >
                <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{slide.title}</h1>
                <p className="text-lg text-white/90 md:text-xl">{slide.description}</p>
                <Button size="lg" className="bg-primary/90 hover:bg-primary">
                  {slide.cta}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  )
}

