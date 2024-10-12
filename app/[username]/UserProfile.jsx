// app/[username]/UserProfile.jsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import EventCard from '../../components/EventCard';


const UserProfile = ({ user, params }) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600 text-center">
          Welcome to my scheduling page. Please select an event below to book a call with me.
        </p>
      </div>

      {user.events.length === 0 ? (
        <p className="text-center text-gray-600">No public events available.</p>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {user.events.map((event) => (
            <EventCard key={event.id} event={event} username={params.username} isPublic />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
