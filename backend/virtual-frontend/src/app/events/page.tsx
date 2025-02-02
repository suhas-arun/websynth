import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const events = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "June 15, 2024",
    description: "Explore cutting-edge technologies and network with industry leaders.",
    registrationLink: "/register/tech-summit"
  },
  {
    id: 2,
    title: "Startup Pitch Competition",
    date: "July 22, 2024", 
    description: "Innovative startups showcase their groundbreaking ideas to investors.",
    registrationLink: "/register/startup-pitch"
  },
  {
    id: 3,
    title: "AI & Machine Learning Conference",
    date: "August 10, 2024",
    description: "Deep dive into the latest advancements in artificial intelligence.",
    registrationLink: "/register/ai-conference"
  }
]

export default function UpcomingEvents() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{event.description}</p>
              <Button 
                href={event.registrationLink}
                className="w-full"
              >
                Register Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}