import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Music, Users, Coins, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Decentralized Music
            <span className="text-primary block">Streaming Platform</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Stream music with direct micropayments to artists. Built on Arbitrum with USDC payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/listener">Start Listening</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/artist">Join as Artist</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Music className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Direct Streaming</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stream high-quality music directly from artists with instant micropayments
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Coins className="w-12 h-12 text-secondary mx-auto mb-4" />
              <CardTitle>USDC Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pay artists directly with USDC on Arbitrum for low fees and fast transactions
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle>Artist Owned</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Artists maintain full ownership and control over their music and earnings
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Web3 Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Decentralized and secure platform built on blockchain technology</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-card rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Ready to Experience Web3 Music?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect your wallet to start streaming music and supporting artists directly with micropayments.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/listener">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
