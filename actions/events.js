"use server";
import { auth } from "@clerk/nextjs/server";
import { eventSchema } from "../app/lib/validators"; 
import { db } from "../lib/prisma";
import { startOfDay, addDays, format, isBefore, addMinutes , parseISO } from "date-fns";

export async function CreateEvent(data) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  let validatedData;
  try {
    validatedData = await eventSchema.parseAsync(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }

 const user = await db.user.findUnique({  // Find the user in the database using Clerk's user ID
    where: { clerkuserid: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const event = await db.event.create({        // Create the event in the database
    data: {
      ...validatedData,
      userId: user.id, // Link the event to the authenticated user
    },
  });
  return event; // Return the newly created event
}

export async function getUserEvents() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where: { clerkuserid: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const events = await db.event.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return { events, username: user.username };
}

export async function deleteEvent(eventId) {
  const { userId } = auth();

  // Check if the user is authenticated
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkuserid: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.userId !== user.id) {
    throw new Error("Event not found or unauthorized");
  }

  await db.event.delete({
    where: { id: eventId },
  });

  return { success: true };
}

export async function getEventDetails(username, eventId) {
  // Fetch event details based on the event ID and associated username
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          username: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error("Event not found or does not belong to the specified user");
  }

  return event;
}
export async function getEventAvailability(eventId) {
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  // Check if event or user availability exists
  if (!event || !event.user.availability) {
    return [];
  }

  const { availability , bookings} = event.user;

  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate , 30);
  const availableDates = [];

  for(let data = startDate; date <= endDate ; date= addDays(date, 1)){
    const dayOfWeek = format(date, "EEEE").toUpperCase()
    const dayAvailability = availability.days.find((d) => d.day === dayOfWeek);

    if(dayAvailability){
      const dateString = format(date, "yyyy-MM-dd");
      const slots =  generateAvailableTimeSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        availability.timeGap
      );

      availableDates.push({
        date: dateString,
        slots,
      });
    }
  }
return availableDates;
}

function generateAvailableTimeSlots(
  startTime,
  endTime,
  duration,
  bookings,
  dateString,
  timeGap = 0
){
  const slots = []

  let  currentTime = parseISO(
    `${dateString}T${startTime.toISOString().slice(11,16)}`
  );

  const slotEndTime = parseISO(
    `${dateString}T${endTime.toISOString().slice(11,16)}`
  );

  const now = new Date();
  if(format(now, "yyyy-MM-dd") === dateString){
    currentTime = isBefore(currentTime,now)?addMinutes(now,timeGap): currentTime;
  }

  while(currentTime < slotEndTime){
    const slotEnd = new Date(currentTime.getTime() + duration * 60000);
  
  const isSlotAvailable = !bookings.some(booking => {
    const bookingStart = booking.startTime;
    const bookingEnd = booking.endTime;

    // Check if the current slot overlaps with any existing bookings
    return (
      (currentTime >= bookingStart && currentTime < bookingEnd) || 
      (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
      (currentTime <= bookingStart && slotEnd >= bookingEnd)
    );
  });

  // If the slot is available, add it to the slots array
  if (isSlotAvailable) {
    slots.push(format(currentTime, 'HH:mm'));
  }

  // Move to the next potential slot
  currentTime = slotEnd;
}

   return slots;
}

    


