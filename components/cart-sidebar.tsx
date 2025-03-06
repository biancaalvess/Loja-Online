"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { updateCartItemQuantity, removeFromCart, checkout } from "@/lib/actions"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type CartSidebarProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Simula busca de dados do carrinho
  useEffect(() => {
    // Em um app real, isso buscaria de uma API
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        name: "Camiseta ",
        price: 129.9,
        image: "https://i.pinimg.com/736x/f0/b5/c9/f0b5c9fdd6d4471516050ce1b40fd340.jpg",
        quantity: 1,
      },
      {
        id: 3,
        name: "Vestido Longo ",
        price: 279.9,
        image: "https://i.pinimg.com/474x/5d/9c/27/5d9c2784d33cb33f56d921e53eb0cc0a.jpg",
        quantity: 2,
      },
    ]
    setCartItems(mockCartItems)
  }, [])

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return

    // Atualização otimista
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))

    // Em um app real, isso chamaria a server action
    await updateCartItemQuantity(id, quantity)
  }

  const handleRemoveItem = async (id: number) => {
    // Atualização otimista
    setCartItems((prev) => prev.filter((item) => item.id !== id))

    // Em um app real, isso chamaria a server action
    await removeFromCart(id)
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      await checkout(cartItems)
      // Em um app real, isso redirecionaria para a página de checkout
      setCartItems([])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      onOpenChange(false)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 19.9 : 0
  const total = subtotal + shipping

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">Seu carrinho está vazio</h3>
            <p className="text-sm text-muted-foreground">Parece que você ainda não adicionou nada ao seu carrinho.</p>
            <Button variant="outline" className="mt-4" onClick={() => onOpenChange(false)}>
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3>{item.name}</h3>
                        <p className="ml-4">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">R$ {item.price.toFixed(2)} cada</p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Diminuir quantidade</span>
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar quantidade</span>
                          </Button>
                        </div>

                        <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Separator />
              <div className="space-y-2 py-6">
                <div className="flex justify-between text-sm">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Frete</p>
                  <p>R$ {shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>

              <SheetFooter>
                <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
                  {isLoading ? "Processando..." : "Finalizar Compra"}
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

