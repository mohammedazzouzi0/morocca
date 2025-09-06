import { Hero } from "@/components/Hero"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import { AboutSection } from "@/components/AboutSection"
import { Testimonials } from "@/components/Testimonials"
import { Newsletter } from "@/components/Newsletter"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
