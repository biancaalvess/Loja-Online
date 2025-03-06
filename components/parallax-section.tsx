"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ParallaxSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  return (
    <section ref={ref} className="relative h-[60vh] overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1600&auto=format&fit=crop"
          alt="Coleção de roupas tranquilas"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/30" />
      </motion.div>

      <div className="container relative z-10 flex h-full items-center justify-center">
        <div className="max-w-2xl text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">Moda Sustentável</h2>
          <p className="mt-4 text-lg md:text-xl">
            Nosso compromisso com o meio ambiente é tão importante quanto nosso compromisso com o estilo. Descubra nossa
            coleção ecológica feita com materiais sustentáveis.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="mt-6 border-white text-white hover:bg-white hover:text-primary"
          >
            Explorar Coleção
          </Button>
        </div>
      </div>
    </section>
  )
}

