'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HackathonsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1 
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl font-bold text-primary mb-6 text-center"
      >
        Hackathons: Innovate, Collaborate, Create
      </motion.h1>

      <motion.div 
        variants={itemVariants}
        className="max-w-2xl mx-auto text-center mb-8"
      >
        <p className="text-lg text-muted-foreground">
          Hackathons are intense, collaborative events where programmers, designers, 
          and innovators come together to solve complex challenges and build innovative solutions 
          in a short, time-constrained environment.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid md:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>What are Hackathons?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Hackathons are 24-48 hour events where tech enthusiasts collaborate 
              to create software, apps, or solutions to specific challenges.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              <li>Rapid skill development</li>
              <li>Networking opportunities</li>
              <li>Innovation and creativity</li>
              <li>Potential for real-world impact</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Stay tuned for upcoming hackathon events in your area. 
              Great opportunities to showcase your skills!
            </p>
            <Button className="mt-4">View Events</Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}