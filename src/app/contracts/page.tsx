import { Navigation } from "@/components/navigation"
import { ContractInteractionDemo } from "@/components/contract-interaction-demo"

export default function ContractsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Smart Contract Integration</h1>
                    <p className="text-muted-foreground">
                        Test the blockchain integration with real smart contract calls on Arbitrum Sepolia testnet.
                    </p>
                </div>

                <ContractInteractionDemo />
            </main>
        </div>
    )
}
