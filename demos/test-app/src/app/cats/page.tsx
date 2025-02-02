import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CatsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 text-primary">Fascinating World of Cats</h1>
        
        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle>Cat Characteristics</CardTitle>
            <CardDescription>Discover the unique traits of our feline friends</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary">
              Cats are remarkable creatures known for their independent nature, acute senses, and graceful movements. 
              They possess extraordinary physical abilities, including incredible agility, night vision, and a keen sense of hearing. 
              Cats are natural predators with retractable claws, flexible spines, and an innate hunting instinct that has been preserved 
              from their wild ancestors.
            </p>
          </CardContent>
        </Card>

        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle>Cat Breeds</CardTitle>
            <CardDescription>Exploring the diversity of feline companions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary">
              From the regal Maine Coon to the sleek Siamese, cat breeds offer incredible variety. 
              Some popular breeds include the Persian with its luxurious coat, the energetic Bengal with wild-like markings, 
              and the unique Sphynx known for its hairless appearance. Each breed brings distinct characteristics, 
              personalities, and genetic traits that make them special.
            </p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Cat Care Basics</CardTitle>
            <CardDescription>Essential tips for responsible cat ownership</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-primary">
              Caring for a cat involves providing a balanced diet, regular veterinary check-ups, mental stimulation, 
              and a safe environment. Cats require daily feeding, clean litter boxes, fresh water, and opportunities 
              for play and exercise. Regular grooming, vaccination, and attention to their physical and emotional 
              needs are crucial for a happy, healthy feline companion.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}