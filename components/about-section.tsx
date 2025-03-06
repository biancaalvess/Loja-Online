"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const features = [
  {
    title: "Materiais Sustentáveis",
    description:
      "Utilizamos tecidos ecológicos e métodos de produção sustentáveis para minimizar nosso impacto ambiental.",
  },
  {
    title: "Produção Ética",
    description:
      "Todas as nossas peças são produzidas em instalações que garantem salários justos e condições de trabalho seguras.",
  },
  {
    title: "Qualidade Artesanal",
    description:
      "Cada peça é cuidadosamente confeccionada para garantir durabilidade, reduzindo a necessidade de substituições frequentes.",
  },
  {
    title: "Design Atemporal",
    description:
      "Nossos designs transcendem tendências sazonais, permitindo que você construa um guarda-roupa que dura por anos.",
  },
]

export default function AboutSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop"
                alt="Sobre nossa marca"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Nossa História</h2>
            <p className="mt-4 text-muted-foreground">
              Fundada com a visão de criar roupas que trazem paz e tranquilidade para seu dia a dia, Bliss é mais do
              que apenas uma marca de moda. Acreditamos no poder das cores suaves e tecidos confortáveis para
              transformar seu humor e melhorar seu bem-estar.
            </p>

            <Accordion type="single" collapsible className="mt-8">
              {features.map((feature, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{feature.title}</AccordionTrigger>
                  <AccordionContent>{feature.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

