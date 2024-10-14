"use client";
import { Calendar, Clock } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../../components/ui/avatar";

const EventDetails = ({ event }) => {
  const { user } = event;
  return (
    <div className="bg-white p-10 lg:w-1/3">
      <h1 className="mb-4 font-bold text-3xl">{event.title}</h1>
      <div className="flex items-center mb-4">
        <Avatar className="mr-4 w-12 h-12">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="font-semibold text-xl">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <Clock  className="mr-2"/>
        <span>{event.duration} minutes</span>
      </div>

      <div className="flex items-center mb-4">
        <Calendar  className="mr-2"/>
        <span>Google Meet</span>
      </div>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventDetails;
