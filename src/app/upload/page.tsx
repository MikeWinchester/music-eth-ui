import { Navigation } from "@/components/navigation"
import { SongUploadForm } from "@/components/song-upload-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Upload Music</h1>
                    <p className="text-muted-foreground">
                        Upload your music to IPFS and register it on the blockchain for streaming with micropayments.
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Upload Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload New Song</CardTitle>
                            <CardDescription>
                                First upload your audio file to IPFS, then register the song metadata on the blockchain.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SongUploadForm />
                        </CardContent>
                    </Card>

                    {/* Upload Instructions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>How to Upload</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Upload to IPFS</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Upload your audio file to IPFS using services like Pinata, NFT.Storage, or run your own IPFS node.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Get IPFS Hash</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Copy the IPFS hash (CID) of your uploaded audio file. It should start with "Qm" or "bafy".
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Register Song</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Fill out the form above with your song title and IPFS hash to register it on the blockchain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
