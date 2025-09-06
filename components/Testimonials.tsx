"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { Star } from "lucide-react"

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      comment: "Absolutely beautiful babouche! The craftsmanship is incredible and they're so comfortable.",
      avatar: "/woman-portrait.png",
    },
    {
      id: 2,
      name: "Ahmed Benali",
      location: "Casablanca, Morocco",
      rating: 5,
      comment: "Quality authentique et service excellent. Je recommande vivement!",
      avatar: "/thoughtful-man-portrait.png",
    },
    {
      id: 3,
      name: "Marie Dubois",
      location: "Paris, France",
      rating: 5,
      comment: "Des babouches magnifiques qui allient tradition et confort moderne.",
      avatar: "/woman-portrait-french.jpg",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-4">{t("customerReviews")}</h2>
          <p className="text-lg text-moroccan-navy/70 max-w-2xl mx-auto text-pretty">{t("reviewsDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-moroccan-gold fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-moroccan-navy/80 italic text-pretty">"{testimonial.comment}"</p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center">
                      <span className="text-moroccan-terracotta font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-moroccan-navy">{testimonial.name}</p>
                      <p className="text-sm text-moroccan-navy/60">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
