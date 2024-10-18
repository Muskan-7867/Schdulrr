import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription, CardFooter
} from '../../../../components/ui/card';
import { Calendar, Clock, Video } from "lucide-react";
import { format } from 'date-fns';
import { Button } from "../../../../components/ui/button"

const MeetingList = ({ type, meetings }) => {
  if (meetings.length === 0) {
    return <p>No {type} meeting found.</p>;
  }
  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => {
        return (
          <Card key={meeting.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-blue-600 text-center">
                {meeting.event.title}
              </CardTitle>
              <CardDescription> with {meeting.name}</CardDescription>
              <CardDescription>&quot;{meeting.additionalInfo}&quot;</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 w-4 h-4" />
                <span>
                    {format(new Date(meeting.startTime), 'MMMM d,yyyy')}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="mr-2 w-4 h-4" />
                <span>
                    {format(new Date(meeting.startTime), 'h:mm a')} - { " "}
                    {format(new Date(meeting.endTime), 'h:mm a')}
                </span>
              </div>

              {meetings.meetLink && (
                 <div className="flex items-center mb-2">
                  <Video className="mr-2 w-4 h-4" />
                  <a  href={meeting.meetLink} target="_blank" rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">Join Meeting </a>
                </div>
                
              )}
            </CardContent>
            <CardFooter>
                <Button variant="destructive"> Cancel Meeting</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default MeetingList;
