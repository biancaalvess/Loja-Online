import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const categories = [
  { name: "Feminino", href: "/category/feminino" },
  { name: "Masculino", href: "/category/masculino" },
  { name: "Infantil", href: "/category/infantil" },
  { name: "Acessórios", href: "/category/acessorios" },
  { name: "Promoções", href: "/category/promocoes" },
]

const company = [
  { name: "Sobre Nós", href: "/sobre" },
  { name: "Carreiras", href: "/carreiras" },
  { name: "Lojas Físicas", href: "/lojas" },
  { name: "Sustentabilidade", href: "/sustentabilidade" },
  { name: "Imprensa", href: "/imprensa" },
]

const customerService = [
  { name: "Fale Conosco", href: "/contato" },
  { name: "Envio e Devoluções", href: "/envio-devolucoes" },
  { name: "Perguntas Frequentes", href: "/faq" },
  { name: "Guia de Tamanhos", href: "/guia-tamanhos" },
  { name: "Rastrear Pedido", href: "/rastrear-pedido" },
]

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold text-primary">
              Bliss
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Bliss é uma marca de roupas sustentável focada em criar peças atemporais com cores que aquecem nosso coração e que trazem
              tranquilidade para seu dia a dia.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Categorias</h3>
            <ul className="mt-4 space-y-2">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium">Empresa</h3>
            <ul className="mt-4 space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium">Atendimento ao Cliente</h3>
            <ul className="mt-4 space-y-2">
              {customerService.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Bliss Moda. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Link href="/politica-privacidade" className="text-xs text-muted-foreground hover:text-primary">
                Política de Privacidade
              </Link>
              <Link href="/termos-servico" className="text-xs text-muted-foreground hover:text-primary">
                Termos de Serviço
              </Link>
              <Link href="/politica-cookies" className="text-xs text-muted-foreground hover:text-primary">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

