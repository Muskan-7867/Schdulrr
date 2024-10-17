import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventDetails, getEventAvailability } from "../../../actions/events";
import EventDetails from '../[eventid]/_components/EventDetails';
import BookingForm from '../[eventid]/_components/BookingForm';

// This is the correct function name for metadata generation
export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventid);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Your App Name`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {


  const event = await getEventDetails(params.username, params.eventid);
  const availability = await getEventAvailability(params.eventid);
  console.log(availability);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex lg:flex-row flex-col justify-center px-4 py-8">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm  event={event} availability={availability}/>
      </Suspense>
    </div>
  );
}
