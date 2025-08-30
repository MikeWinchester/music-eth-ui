"use client"

import type React from "react"

import { useState } from "react"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Music, CheckCircle, AlertCircle, ExternalLink, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SongData {
  title: string
  artist: string
  ipfsHash: string
  description: string
  genre: string
  duration: string
}

interface UploadedSong extends SongData {
  id: string
  uploadDate: string
  status: "pending" | "confirmed" | "failed"
  txHash?: string
}

export function SongUploadForm() {
  const { address, isConnected } = useAccount()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedSongs, setUploadedSongs] = useState<UploadedSong[]>([])

  const [formData, setFormData] = useState<SongData>({
    title: "",
    artist: "",
    ipfsHash: "",
    description: "",
    genre: "",
    duration: "",
  })

  const handleInputChange = (field: keyof SongData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateIpfsHash = (hash: string): boolean => {
    // Basic IPFS hash validation
    return hash.startsWith("Qm") || hash.startsWith("bafy") || hash.startsWith("bafk")
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "IPFS hash copied to clipboard",
      })
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validate IPFS hash
      if (!validateIpfsHash(formData.ipfsHash)) {
        throw new Error("Invalid IPFS hash. Hash should start with 'Qm', 'bafy', or 'bafk'")
      }

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create new uploaded song
      const newSong: UploadedSong = {
        ...formData,
        id: Date.now().toString(),
        uploadDate: new Date().toISOString(),
        status: "confirmed",
        txHash: "0x" + Math.random().toString(16).substr(2, 64), // Mock transaction hash
      }

      setUploadedSongs((prev) => [newSong, ...prev])

      // Reset form
      setFormData({
        title: "",
        artist: "",
        ipfsHash: "",
        description: "",
        genre: "",
        duration: "",
      })

      toast({
        title: "Song uploaded successfully!",
        description: "Your song has been registered on the blockchain and is now available for streaming.",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload song. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Please connect your wallet to upload songs.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Song Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter song title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist">Artist Name *</Label>
              <Input
                id="artist"
                type="text"
                placeholder="Enter artist name"
                value={formData.artist}
                onChange={(e) => handleInputChange("artist", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipfsHash">IPFS Hash *</Label>
            <Input
              id="ipfsHash"
              type="text"
              placeholder="QmXXXXXX... or bafyXXXXXX..."
              value={formData.ipfsHash}
              onChange={(e) => handleInputChange("ipfsHash", e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              The IPFS hash of your uploaded audio file. Must start with "Qm", "bafy", or "bafk".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                type="text"
                placeholder="e.g., Electronic, Rock, Jazz"
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                type="text"
                placeholder="e.g., 3:45"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your song, inspiration, or any additional details..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !formData.title.trim() || !formData.ipfsHash.trim()}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Registering Song on Blockchain...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Register Song
            </>
          )}
        </Button>
      </form>

      {/* Uploaded Songs List */}
      {uploadedSongs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Uploaded Songs</CardTitle>
            <CardDescription>Your songs registered on the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{song.title}</h3>
                      <p className="text-sm text-muted-foreground">by {song.artist}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">IPFS:</span>
                        <code className="text-xs bg-muted px-1 rounded">{song.ipfsHash.slice(0, 12)}...</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(song.ipfsHash)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {song.status === "confirmed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {song.status === "pending" && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        )}
                        {song.status === "failed" && <AlertCircle className="h-4 w-4 text-red-500" />}
                        <span className="text-sm capitalize">{song.status}</span>
                      </div>
                      {song.txHash && (
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-muted-foreground">Tx:</span>
                          <code className="text-xs bg-muted px-1 rounded">{song.txHash.slice(0, 8)}...</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://sepolia.arbiscan.io/tx/${song.txHash}`, "_blank")}
                            className="h-4 w-4 p-0"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
