import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center">
        About Us
      </h1>
      
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-4">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We are dedicated to delivering innovative solutions that transform 
              the way businesses approach technology and digital transformation. 
              Our core purpose is to empower organizations with cutting-edge 
              software solutions that drive efficiency, productivity, and growth.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2015, our company began as a small team of passionate 
              technologists with a shared vision of creating meaningful technological 
              solutions. From our humble beginnings in a small office, we have grown 
              into a dynamic organization serving clients across multiple industries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Innovation: Continuously pushing the boundaries of technology</li>
              <li>Integrity: Maintaining the highest standards of professionalism</li>
              <li>Collaboration: Working together to achieve exceptional results</li>
              <li>Customer-Centric: Putting our clients' needs at the heart of everything we do</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUsPage;