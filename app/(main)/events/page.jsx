import { Suspense } from "react";
import { getUserEvents } from "../../../actions/events";
import EventCard from '../../../components/EventCard';

export default function Eventspage(){
  return (
   <Suspense fallback={<div>Loading Events...</div>}>
        <Events />
   </Suspense>
)}

const Events = async () => {
 const {events, username} =  await getUserEvents()
 if(events.length === 0){
  return <p>You does not created any events yet.</p>
 }
  return <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
    {events.map((event)=>(
      <EventCard Key={event.id} event={event}  username={username}/>
    ))}
  </div>
}


