import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const EventCard = ({ event, username }) => {
    return (
      <Card className="flex flex-col justify-between cursor-pointer">
        <CardHeader>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>
              {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
            </span>
            <span>{event._count.bookings} Bookings</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {event.description
              ? event.description.substring(
                  0,
                  event.description.indexOf(".") !== -1
                    ? event.description.indexOf(".")
                    : event.description.length
                )
              : "No description available"}
          </p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    );
  };
  
  export default EventCard;
  
