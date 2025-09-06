"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/LanguageContext"
import { Mail } from "lucide-react"

export function Newsletter() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-20 bg-moroccan-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-moroccan-gold/20 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-moroccan-gold" />
            </div>
            <h2 className="font-amiri font-bold text-3xl md:text-4xl text-white text-balance">
              {t("newsletterTitle")}
            </h2>
            <p className="text-lg text-moroccan-cream/80 max-w-2xl mx-auto text-pretty">{t("newsletterDescription")}</p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-0 text-moroccan-navy placeholder:text-moroccan-navy/60"
                />
                <Button
                  type="submit"
                  className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white px-8"
                >
                  {t("subscribe")}
                </Button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-moroccan-gold/20 border border-moroccan-gold/30 rounded-lg p-4">
                <p className="text-moroccan-gold font-medium">{t("subscriptionSuccess")}</p>
              </div>
            </div>
          )}

          <p className="text-sm text-moroccan-cream/60">{t("newsletterPrivacy")}</p>
        </div>
      </div>
    </section>
  )
}
