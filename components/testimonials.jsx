import { Card, CardContent } from "../components/ui/card"
import {Carousel,CarouselContent,CarouselItem} from "../components/ui/carousel"
const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content:
        "Schedulrr has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "David Lee",
      role: "Freelance Designer",
      content:
        "As a freelancer, Schedulrr helps me stay organized and professional. My clients love how easy it is to book time with me.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Emily Chen",
      role: "Startup Founder",
      content:
        "Schedulrr streamlined our hiring process. Setting up interviews has never been easier!",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Michael Brown",
      role: "Sales Executive",
      content:
        "I've seen a 30% increase in my meeting bookings since using Schedulrr. It's a game-changer for sales professionals.",
      image: "https://i.pravatar.cc/150?img=4",
    },
  ];

const Testimonials = () => {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className='ml-1'>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default Testimonials
