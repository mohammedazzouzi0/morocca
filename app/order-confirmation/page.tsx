"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import { CheckCircle, MessageCircle, Home, Package } from "lucide-react"

export default function OrderConfirmationPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-moroccan-cream/20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h1 className="font-amiri font-bold text-3xl text-moroccan-navy">{t("orderConfirmed")}</h1>
                <p className="text-lg text-moroccan-navy/80 text-pretty">{t("orderConfirmationMessage")}</p>
              </div>

              {/* WhatsApp Contact Info */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                    <h2 className="font-semibold text-green-800">{t("whatsappContact")}</h2>
                  </div>
                  <p className="text-sm text-green-700 text-pretty">{t("whatsappContactMessage")}</p>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold text-moroccan-navy">{t("whatHappensNext")}</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-moroccan-terracotta font-bold text-sm">1</span>
                    </div>
                    <p className="text-sm text-moroccan-navy/80">{t("step1")}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-moroccan-terracotta font-bold text-sm">2</span>
                    </div>
                    <p className="text-sm text-moroccan-navy/80">{t("step2")}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-moroccan-terracotta font-bold text-sm">3</span>
                    </div>
                    <p className="text-sm text-moroccan-navy/80">{t("step3")}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6">
                <Button
                  asChild
                  className="w-full bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white"
                  size="lg"
                >
                  <Link href="/products">
                    <Package className="w-5 h-5 mr-2" />
                    {t("continueShopping")}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-moroccan-navy text-moroccan-navy hover:bg-moroccan-navy hover:text-white bg-transparent"
                  size="lg"
                >
                  <Link href="/">
                    <Home className="w-5 h-5 mr-2" />
                    {t("backToHome")}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
