import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowBigRight } from "lucide-react";


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center lg:flex-row justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-extrabold pb-6 text-blue-600 ">
            Simplify your Scheduling!!</h1>
          <p className="text-xl text-gray-600 mb-10">Schedulrr helps to manage  your time effectively. Create events, set your
            availability, and let others book time with you seamlessely. </p>

            <Link href='/dashboard' >
              <Button size='lg' className='text-lg'>
                Get Started <ArrowBigRight className="w-5 h-5 ml-2"/></Button>
            </Link>
        </div>

          <div className="lg:w-1/2 flex justify-center ">
        <div className="relative w-full max-w-md aspect-square">
            <Image
             src='/poster.png'
             alt="scheduling image"
             layout="fill"
             objectFit="contain" />
          </div>
        </div>
      </div>
    </main>
  );
}
