"use client"
import { Link, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "./ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "../hooks/usefetch";
import { deleteEvent } from "../actions/events";

const EventCard = ({ event, username, isPublic= false }) => {
    const[IsCopied, setIsCopied] = useState(false)
    const router = useRouter()


    const handleCopy= async () => {
     try {
        await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
     } catch (error) {
        console.log("Failed to copy", error)
     }
    }

    const {loading, fn:funcDeleteEvent} = useFetch(deleteEvent)

    const handleDelete =  async() => {
        if(window?.confirm("Are you sure you want to delete this event?")){
          await funcDeleteEvent(event.id);
          router.refresh();
        }
    }

    const handleCard =(e) => {
      if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SVG' ){
        window?.open(
          `${window?.location.origin}/${username}/${event.id}`,
          "_blank"
        )
      }
    }
    return (
      <Card className="flex flex-col justify-between cursor-pointer" onClick={handleCard}>
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
      {!isPublic &&(
          <CardFooter className='flex gap-2'>
            <Button variant='outline' className='flex items-center' onClick={handleCopy}>
                <Link className="mr-2 h-4 w-4"/>{IsCopied ? "Copied!" : "Copy Link"}
            </Button>
            <Button variant='destructive'  className='flex items-center' onClick={handleDelete} disabled={loading}>
                <Trash2  className="mr-2 h-4 w-4"/>
               {loading ? "Deleting...": "Delete"}
            </Button>
        </CardFooter>
        )}
      </Card>
    );
  };
  
  export default EventCard;
  
