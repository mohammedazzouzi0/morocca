"use client"

import { useState } from "react"
import { MessageCircle, X, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { sendWhatsAppMessage, generateSupportMessage } from "@/lib/whatsapp"

export function WhatsAppButton() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleQuickMessage = (type: "general" | "order" | "product" | "shipping") => {
    const message = generateSupportMessage(type)
    sendWhatsAppMessage(message)
    setIsOpen(false)
  }

  const handleDirectMessage = () => {
    sendWhatsAppMessage(t("whatsappGreeting"))
    setIsOpen(false)
  }

  return (
    <>
      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 shadow-2xl border-0">
          <CardHeader className="bg-green-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("whatsappContact")}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-green-600 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-moroccan-navy/80">{t("whatsappContactMessage")}</p>

              {/* Contact Info */}
              <div className="space-y-2 text-xs text-moroccan-navy/70">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3" />
                  <span>+212 6XX XXX XXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3" />
                  <span>info@babouchemaroc.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>Marrakech, Morocco</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-moroccan-navy">{t("quickActions")}:</p>

              <Button
                onClick={handleDirectMessage}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-sm"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("contactWhatsApp")}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleQuickMessage("product")}
                  variant="outline"
                  size="sm"
                  className="text-xs border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  {t("products")}
                </Button>
                <Button
                  onClick={() => handleQuickMessage("order")}
                  variant="outline"
                  size="sm"
                  className="text-xs border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  {t("orders")}
                </Button>
                <Button
                  onClick={() => handleQuickMessage("shipping")}
                  variant="outline"
                  size="sm"
                  className="text-xs border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  {t("shipping")}
                </Button>
                <Button
                  onClick={() => handleQuickMessage("general")}
                  variant="outline"
                  size="sm"
                  className="text-xs border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  {t("help")}
                </Button>
              </div>
            </div>

            <div className="text-xs text-moroccan-navy/60 text-center">
              {t("responseTime")}: {t("within24Hours")}
            </div>
          </CardContent>
        </Card>
      )}

      {/* WhatsApp Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 animate-pulse" />}
        <span className="sr-only">{t("contactWhatsApp")}</span>
      </Button>
    </>
  )
}
