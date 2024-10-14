import { notFound } from "next/navigation";
import { getEventDetails } from "../../../actions/events";
import EventDetails from '../[eventid]/_components/EventDetails'; // Ensure proper import

export async function generateMetaData({ params }) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Schedulrr`,
    description: `Schedule a ${event.duration}-minute ${event.title} with ${event.user.name}.`,
  };
}

const EventPage = async ({ params }) => {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return notFound();
  }

  // Render the Client Component and pass the user data
  return (
    <div className="flex lg:flex-row flex-col justify-center px-4 py-8">
      <EventDetails event={event} />
      {/* Uncomment Suspense block if BookingForm is ready as a Client Component */}
      {/* <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm />
      </Suspense> */}
    </div>
  );
};

export default EventPage;
