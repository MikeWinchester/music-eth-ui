"use client"

import { useAccount } from "wagmi"
import { useUsdcBalance } from "@/hooks/use-music-contract"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, ExternalLink, Wallet } from "lucide-react"

export function UsdcBalance() {
  const { address, isConnected } = useAccount()
  const { balance, isLoading } = useUsdcBalance(address)

  if (!isConnected) {
    return null
  }

  const handleGetUsdc = () => {
    // Open Arbitrum Sepolia faucet or bridge
    window.open("https://bridge.arbitrum.io/", "_blank")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>USDC Balance</span>
        </CardTitle>
        <CardDescription>Your USDC balance on Arbitrum Sepolia testnet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            <div>
              {isLoading ? (
                <div className="animate-pulse bg-muted h-6 w-16 rounded" />
              ) : (
                <p className="text-2xl font-bold">${balance}</p>
              )}
              <p className="text-sm text-muted-foreground">USDC</p>
            </div>
          </div>
          <Button onClick={handleGetUsdc} variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Get USDC
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
