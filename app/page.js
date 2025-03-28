import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { features, howItWorks } from "./data/data";
import Testimonials from "../components/testimonials";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold pb-6 text-blue-600">
            Simplify your Scheduling!!
          </h1>
          <p className="text-md md:text-xl text-gray-600 mb-8">
            Schedulrr helps to manage your time effectively. Create events, set your availability, and let others book time with you seamlessly.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg">
              Get Started <ArrowBigRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png"
              alt="scheduling image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="transition-transform transform hover:scale-105">
                <CardHeader className="text-center">
                  <Icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                  <CardTitle className="text-blue-600">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          What our users say
        </h2>
        <Testimonials />
      </div>

      {/* How It Works Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to simplify your scheduling?</h2>
        <p className="text-lg md:text-xl mb-6">
          Join thousands of professionals who trust Schedulrr for efficient time management.
        </p>
        <Link href="/dashboard">
          <Button size="lg" variant="secondary" className="text-blue-600">
            Start for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
