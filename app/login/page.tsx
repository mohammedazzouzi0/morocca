"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const params = useSearchParams()
  const returnTo = params.get("returnTo") || "/admin"
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    if (returnTo) formData.set("returnTo", returnTo)

    try {
      const res = await fetch("/api/login", { method: "POST", body: formData })
      if (res.redirected) {
        window.location.href = res.url
        return
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.message || "Login failed")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-moroccan-cream/20 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-moroccan-navy">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required autoComplete="username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required autoComplete="current-password" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full bg-moroccan-terracotta text-white" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm text-moroccan-navy/70">
              <Link href="/">← Back to site</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
