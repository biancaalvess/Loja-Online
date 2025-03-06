"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/lib/actions"
import { toast } from "sonner"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await subscribeToNewsletter(email)
      toast.success("Obrigado por se inscrever!")
      setEmail("")
    } catch (error) {
      toast.error("Algo deu errado. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-primary/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Fique Conectado</h2>
          <p className="mt-4 text-muted-foreground">
            Assine nossa newsletter para receber atualizações sobre novos lançamentos, ofertas especiais e dicas de
            estilo.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

