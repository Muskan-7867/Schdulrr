"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";
export async function getUserAvailability(data) {
    const { userId } = auth();
  
    // Check if the user is authenticated
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { clerkuserid: userId },
        include:{
            availability :{
                include : {days: true},
            },
        },
      });
    
      if (!user ||  !user.availability) {
            return null;
      }

      const availabilityData = {
        timeGap: user.availability.timeGap,
      }

      [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ].foreach((day)=>{
        const dayavailability = user.availability.days.find((d) => d.day === day.toUpperCase());

        availabilityData[day]={
            isAvailable: !!dayavailability,
            startTime: dayavailability
            ? dayavailability.startTime.toISOString().slice(11,16)
            : "09:00",
            endTime: dayavailability
            ? dayavailability.endTime.toISOString().slice(11,16)
            : "17:00",

        }
      })
     return availabilityData
}