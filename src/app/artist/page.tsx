import { Navigation } from "@/components/navigation"
import { ArtistRegistrationForm } from "@/components/artist-registration-form"
import { ArtistDashboard } from "@/components/artist-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtistPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Artist Portal</h1>
                    <p className="text-muted-foreground">
                        Register as an artist and start uploading your music to earn directly from listeners.
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Registration Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Artist Registration</CardTitle>
                            <CardDescription>Connect your wallet and register as an artist to start uploading music.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ArtistRegistrationForm />
                        </CardContent>
                    </Card>

                    {/* Dashboard Section */}
                    <ArtistDashboard />
                </div>
            </main>
        </div>
    )
}