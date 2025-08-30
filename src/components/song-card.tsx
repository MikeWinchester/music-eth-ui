"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, Pause, Music, Clock, DollarSign, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Song {
  id: string
  title: string
  artist: string
  ipfsHash: string
  genre: string
  duration: string
  price: string
  plays: number
  uploadDate: string
  description?: string
}

interface SongCardProps {
  song: Song
}

type PlayState = "idle" | "loading" | "playing" | "success" | "error"

export function SongCard({ song }: SongCardProps) {
  const { toast } = useToast()
  const [playState, setPlayState] = useState<PlayState>("idle")
  const [txHash, setTxHash] = useState<string | null>(null)

  const handlePlay = async () => {
    setPlayState("loading")
    setTxHash(null)

    try {
      // Simulate blockchain transaction for micropayment
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock transaction hash
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64)
      setTxHash(mockTxHash)

      // In a real app, this would:
      // 1. Call smart contract playSong(song_id) function
      // 2. Transfer USDC micropayment to artist
      // 3. Get IPFS content and start audio playback
      // 4. Update play count on blockchain

      setPlayState("success")

      toast({
        title: "Payment Successful!",
        description: `Paid $${song.price} USDC to ${song.artist}. Starting playback...`,
      })

      // Simulate playing state
      setTimeout(() => {
        setPlayState("playing")
      }, 2000)

      // Auto-reset after "song" finishes (demo purposes)
      setTimeout(() => {
        setPlayState("idle")
        setTxHash(null)
      }, 10000)
    } catch (error) {
      setPlayState("error")
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      })

      // Reset after error
      setTimeout(() => {
        setPlayState("idle")
      }, 3000)
    }
  }

  const handleStop = () => {
    setPlayState("idle")
    setTxHash(null)
  }

  const getButtonContent = () => {
    switch (playState) {
      case "loading":
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Processing Payment...
          </>
        )
      case "success":
        return (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Payment Confirmed
          </>
        )
      case "playing":
        return (
          <>
            <Pause className="h-4 w-4 mr-2" />
            Now Playing
          </>
        )
      case "error":
        return (
          <>
            <AlertCircle className="h-4 w-4 mr-2" />
            Payment Failed
          </>
        )
      default:
        return (
          <>
            <Play className="h-4 w-4 mr-2" />
            Play (${song.price} USDC)
          </>
        )
    }
  }

  const getButtonVariant = () => {
    switch (playState) {
      case "success":
        return "default"
      case "playing":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{song.title}</CardTitle>
              <CardDescription>by {song.artist}</CardDescription>
            </div>
          </div>
          <Badge variant="outline">{song.genre}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {song.description && <p className="text-sm text-muted-foreground">{song.description}</p>}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{song.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Play className="h-4 w-4" />
            <span>{song.plays.toLocaleString()} plays</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm font-medium">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>${song.price} USDC</span>
          </div>
          <div className="text-xs text-muted-foreground">{new Date(song.uploadDate).toLocaleDateString()}</div>
        </div>

        <Button
          onClick={playState === "playing" ? handleStop : handlePlay}
          disabled={playState === "loading" || playState === "success"}
          variant={getButtonVariant()}
          className="w-full"
        >
          {getButtonContent()}
        </Button>

        {playState === "success" && txHash && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex items-center justify-between">
                <span>Transaction confirmed!</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://sepolia.arbiscan.io/tx/${txHash}`, "_blank")}
                  className="h-6 p-1 text-green-600 hover:text-green-700"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-xs mt-1 font-mono">
                {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {playState === "playing" && (
          <Alert className="border-blue-200 bg-blue-50">
            <Music className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="flex items-center justify-between">
                <span>Streaming from IPFS...</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-blue-600 animate-pulse" />
                  <div className="w-1 h-4 bg-blue-600 animate-pulse" style={{ animationDelay: "0.1s" }} />
                  <div className="w-1 h-4 bg-blue-600 animate-pulse" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
              <div className="text-xs mt-1">
                IPFS: {song.ipfsHash.slice(0, 12)}...{song.ipfsHash.slice(-8)}
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
