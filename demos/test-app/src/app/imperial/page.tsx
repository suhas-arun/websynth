import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ImperialCollegePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Imperial College London
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Brief History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Founded in 1907, Imperial College London emerged from the merger of three prestigious institutions: 
              the Royal College of Science, the Royal School of Mines, and the City and Guilds College.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Reputation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Consistently ranked among the top universities globally, Imperial is renowned for excellence 
              in science, engineering, medicine, and business.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notable Research and Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Imperial has been home to numerous Nobel Prize winners and groundbreaking research in fields 
              like quantum physics, medical innovations, and climate science.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location and Campus</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Located in the heart of London, the main campus is in South Kensington, a vibrant area 
              near world-class museums and cultural institutions.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="outline">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}