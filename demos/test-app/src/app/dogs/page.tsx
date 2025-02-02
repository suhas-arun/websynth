import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"

export default function DogsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          The Wonderful World of Dogs
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Dogs have been humanity's loyal companions for thousands of years, 
          offering friendship, support, and unconditional love across cultures and generations.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Understanding Our Canine Friends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Dogs are remarkable creatures that have evolved alongside humans for over 15,000 years. 
              Originally descended from wolves, they have been domesticated and bred for various purposes, 
              from hunting and herding to companionship and service.
            </p>
            <p>
              With over 300 recognized breeds worldwide, dogs exhibit incredible diversity in size, 
              temperament, and capabilities. From tiny Chihuahuas to massive Great Danes, each breed 
              brings unique characteristics and potential.
            </p>
            <p>
              Beyond their physical attributes, dogs possess remarkable emotional intelligence, 
              capable of understanding human emotions and forming deep, meaningful bonds with their families.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}