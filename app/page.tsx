import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import Newsletter from "@/components/newsletter"
import ParallaxSection from "@/components/parallax-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <ParallaxSection />
      <AboutSection />
      <Newsletter />
    </main>
  )
}

