"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, User, Search, Menu, X, Heart, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LoginModal } from "@/components/login-modal"
import { CartSidebar } from "@/components/cart-sidebar"

const categories = [
  { name: "Feminino", subcategories: ["Vestidos", "Blusas", "Calças", "Acessórios"] },
  { name: "Masculino", subcategories: ["Camisas", "Calças", "Jaquetas", "Acessórios"] },
  { name: "Infantil", subcategories: ["Meninas", "Meninos", "Bebês", "Escolar"] },
  { name: "Promoções", subcategories: ["Liquidação", "Sazonal", "Ofertas Especiais"] },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-serif text-2xl font-bold text-primary">
          Bliss
          </Link>

          <nav className="hidden md:flex gap-6">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {category.subcategories.map((subcategory) => (
                    <DropdownMenuItem key={subcategory} asChild>
                      <Link href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}>
                        {subcategory}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setLoginOpen(true)}>
            <User className="h-5 w-5" />
            <span className="sr-only">Conta</span>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favoritos</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Carrinho</span>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background p-6 md:hidden">
          <nav className="flex flex-col gap-6">
            {categories.map((category) => (
              <div key={category.name} className="space-y-3">
                <div className="font-medium">{category.name}</div>
                <div className="ml-4 flex flex-col gap-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}

      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  )
}

