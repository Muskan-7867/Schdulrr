import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowBigRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { features, howItWorks } from "./data/data"; // Import from app/data/data.js
import Testimonials from "../components/testimonials"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center lg:flex-row justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-extrabold pb-6 text-blue-600 ">
            Simplify your Scheduling!!
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Schedulrr helps to manage your time effectively. Create events, set your
            availability, and let others book time with you seamlessly.
          </p>

          <Link href="/dashboard">
            <Button size="lg" className="text-lg">
              Get Started <ArrowBigRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png"
              alt="scheduling image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon; // Store the icon component for use in JSX
            return (
              <Card key={index}>
                <CardHeader>
                  <Icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                  <CardTitle className="text-center text-blue-600">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          What our user say
        </h2>
      <Testimonials />
      </div>

      {/* How It Works Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          How It Works
        </h2>
        </div>
    </main>
  );
}
