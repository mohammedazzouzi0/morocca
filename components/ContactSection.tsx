"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/LanguageContext"
import { sendWhatsAppMessage, generateSupportMessage } from "@/lib/whatsapp"
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleWhatsAppContact = () => {
    const message =
      `👋 *${t("contactForm")}*\n\n` +
      `الاسم - Name: ${formData.name}\n` +
      `البريد - Email: ${formData.email}\n` +
      `الهاتف - Phone: ${formData.phone}\n` +
      `الموضوع - Subject: ${formData.subject}\n\n` +
      `الرسالة - Message:\n${formData.message}\n\n` +
      `شكرا - Thank you! 🙏`

    sendWhatsAppMessage(message)
  }

  const handleQuickContact = (type: "general" | "order" | "product" | "shipping") => {
    const message = generateSupportMessage(type)
    sendWhatsAppMessage(message)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-4">{t("contactUs")}</h2>
          <p className="text-lg text-moroccan-navy/70 max-w-2xl mx-auto text-pretty">{t("contactDescription")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl text-moroccan-navy mb-6">{t("sendMessage")}</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{t("name")} *</Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">{t("email")} *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">{t("phone")}</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">{t("subject")} *</Label>
                    <Input
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">{t("message")} *</Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <Button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("sendViaWhatsApp")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl text-moroccan-navy mb-6">{t("contactInfo")}</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-moroccan-terracotta" />
                    </div>
                    <div>
                      <h4 className="font-medium text-moroccan-navy">{t("phone")}</h4>
                      <p className="text-moroccan-navy/70">+212 6XX XXX XXX</p>
                      <p className="text-sm text-moroccan-navy/60">{t("callUs")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-moroccan-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-moroccan-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium text-moroccan-navy">{t("email")}</h4>
                      <p className="text-moroccan-navy/70">info@babouchemaroc.com</p>
                      <p className="text-sm text-moroccan-navy/60">{t("emailUs")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-moroccan-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-moroccan-navy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-moroccan-navy">{t("address")}</h4>
                      <p className="text-moroccan-navy/70">Marrakech, Morocco</p>
                      <p className="text-sm text-moroccan-navy/60">{t("visitUs")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-moroccan-navy">{t("businessHours")}</h4>
                      <p className="text-moroccan-navy/70">{t("mondayToFriday")}: 9:00 - 18:00</p>
                      <p className="text-moroccan-navy/70">{t("saturday")}: 9:00 - 16:00</p>
                      <p className="text-sm text-moroccan-navy/60">{t("closedSunday")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl text-moroccan-navy mb-6">{t("quickContact")}</h3>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleQuickContact("product")}
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    {t("productQuestions")}
                  </Button>
                  <Button
                    onClick={() => handleQuickContact("order")}
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    {t("orderSupport")}
                  </Button>
                  <Button
                    onClick={() => handleQuickContact("shipping")}
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    {t("shippingInfo")}
                  </Button>
                  <Button
                    onClick={() => handleQuickContact("general")}
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    {t("generalHelp")}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{t("preferWhatsApp")}</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">{t("fasterResponse")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
