import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Organization</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering innovation and driving positive change through technology and collaboration.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>
            Committed to solving complex challenges through innovative solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We are a dedicated team of professionals passionate about creating meaningful 
            technological solutions that address real-world problems. Our approach combines 
            cutting-edge technology with human-centered design to deliver impactful results.
          </p>
          <p className="mb-4">
            By leveraging the latest advancements in software development and strategic thinking, 
            we aim to transform industries, enhance user experiences, and contribute to 
            technological progress.
          </p>
          <Button>Learn More About Us</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We believe in collaborative innovation, bringing together diverse perspectives 
              to create comprehensive and effective solutions. Our team combines technical 
              expertise with creative problem-solving.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Innovation</li>
              <li>Integrity</li>
              <li>Collaboration</li>
              <li>Continuous Learning</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}