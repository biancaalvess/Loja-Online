"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addToCart } from "@/lib/actions"

// Dados de produtos
const products = {
  tendencias: [
    {
      id: 1,
      name: "Vestido Blue",
      price: 129.9,
      image: "https://i.pinimg.com/736x/4b/2f/33/4b2f33bb904e62ab383e061e5c0657d2.jpg",
      category: "Feminino",
      isNew: true,
    },
    {
      id: 2,
      name: "Camisa Linho Serena",
      price: 199.9,
      image: "https://i.pinimg.com/736x/2c/f1/a8/2cf1a85ce5932ac0b6ab4bd543327f35.jpg",
      category: "Feminino",
      isNew: false,
    },
    {
      id: 3,
      name: "Vestido Longo ",
      price: 279.9,
      image: "https://i.pinimg.com/736x/26/c2/b6/26c2b6c998636502eab34f2ccf29f40c.jpg",
      category: "Feminino",
      isNew: true,
    },
    {
      id: 4,
      name: "Suéter Oversized ",
      price: 229.9,
      image: "https://i.pinimg.com/736x/32/43/dd/3243dd35c9f304c479f5a305dc341fd9.jpg",
      category: "Feminino",
      isNew: false,
    },
  ],
  maisvendidos: [
    {
      id: 5,
      name: "Conjunto Harmonia",
      price: 349.9,
      image: "https://i.pinimg.com/736x/09/72/54/097254ab0119950b6e405bc65926064a.jpg",
      category: "Feminino",
      isNew: false,
    },
    {
      id: 6,
      name: "Calça Lounge ",
      price: 159.9,
      image: "https://i.pinimg.com/736x/a1/a2/ea/a1a2ea67773644f4bb56991efaa34c08.jpg",
      category: "Feminino",
      isNew: false,
    },
    {
      id: 7,
      name: "Blusa Algodão ",
      price: 179.9,
      image: "https://i.pinimg.com/736x/75/43/cf/7543cff90d8c5f3d4a53c86aa1c4c76e.jpg",
      category: "Feminino",
      isNew: true,
    },
    {
      id: 8,
      name: "Cardigan Tricô",
      price: 249.9,
      image: "https://i.pinimg.com/736x/51/1c/33/511c339df090db50bca58c853f987a6d.jpg",
      category: "Feminino",
      isNew: false,
    },
  ],
  lancamentos: [
    {
      id: 9,
      name: "Saia Dream ",
      price: 189.9,
      image: "https://i.pinimg.com/736x/8b/a4/e2/8ba4e2ddebc2b1d42ea76b5800d44411.jpg",
      category: "Feminino",
      isNew: true,
    },
    {
      id: 10,
      name: "Vestido Midi ",
      price: 259.9,
      image: "https://i.pinimg.com/736x/d6/04/21/d6042122564b98be0260167254932e2b.jpg",
      category: "Feminino",
      isNew: true,
    },
    {
      id: 11,
      name: "Vestido Slip ",
      price: 239.9,
      image: "https://i.pinimg.com/736x/58/41/eb/5841eb8e0e3c93db8d9d6ff4999544ab.jpg",
      category: "Feminino",
      isNew: true,
    },
    {
      id: 12,
      name: "Conjunto Linho ",
      price: 299.9,
      image: "https://i.pinimg.com/736x/ae/50/08/ae5008390b9349d0efbdf171421f1582.jpg",
      category: "Feminino",
      isNew: true,
    },
  ],
}

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id))
    } else {
      setWishlist([...wishlist, id])
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Nossa Coleção</h2>
          <p className="mt-4 text-muted-foreground">Descubra nossa coleção de roupas que vai conquistar seu coração!</p>
        </div>

        <Tabs defaultValue="tendencias" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="tendencias">Tendências</TabsTrigger>
            <TabsTrigger value="maisvendidos">Mais Vendidos</TabsTrigger>
            <TabsTrigger value="lancamentos">Lançamentos</TabsTrigger>
          </TabsList>

          {(Object.keys(products) as Array<keyof typeof products>).map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {products[category].map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <Card className="overflow-hidden group">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 bg-white/80 hover:bg-white"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart
                            className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          <span className="sr-only">Adicionar aos favoritos</span>
                        </Button>
                        {product.isNew && <Badge className="absolute left-2 top-2">Novo</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                        <h3 className="font-medium mt-1">{product.name}</h3>
                        <div className="mt-1 font-semibold">R$ {product.price.toFixed(2)}</div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <form action={addToCart} className="w-full">
                          <input type="hidden" name="productId" value={product.id} />
                          <Button className="w-full gap-2" type="submit">
                            <ShoppingBag className="h-4 w-4" />
                            Adicionar ao Carrinho
                          </Button>
                        </form>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

