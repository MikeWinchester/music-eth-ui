import { Navigation } from "@/components/navigation"
import { ListenerDashboard } from "@/components/listener-dashboard"

export default function ListenerPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Music Catalog</h1>
                    <p className="text-muted-foreground">
                        Discover and stream music with direct micropayments to artists using USDC on Arbitrum.
                    </p>
                </div>

                <ListenerDashboard />
            </main>
        </div>
    )
}
