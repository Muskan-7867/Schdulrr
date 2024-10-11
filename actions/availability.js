"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";

// Function to get user's availability
export async function getUserAvailability() {
  const { userId } = auth();

  // Check if the user is authenticated
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch the user and their availability
  const user = await db.user.findUnique({
    where: { clerkuserid: userId },  // Corrected field name
    include: {
      availability: {
        include: { days: true },
      },
    },
  });

  // Check if user and availability exist
  if (!user || !user.availability) {
    return null;
  }

  // Initialize availability data
  const availabilityData = {
    timeGap: user.availability.timeGap,
  };

  // Loop over the days of the week
  ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].forEach((day) => {
    const dayAvailability = user.availability.days.find((d) => d.day === day.toUpperCase());

    availabilityData[day] = {
      isAvailable: !!dayAvailability,
      startTime: dayAvailability
        ? dayAvailability.startTime.toISOString().slice(11, 16)
        : "09:00",
      endTime: dayAvailability
        ? dayAvailability.endTime.toISOString().slice(11, 16)
        : "17:00",
    };
  });

  return availabilityData;
}

// Function to update user's availability
export async function updateAvailability(data) {
  const { userId } = auth();

  // Check if the user is authenticated
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch the user and their availability
  const user = await db.user.findUnique({
    where: { clerkuserid: userId },  // Corrected field name
    include: {
      availability: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Prepare the availability data for the database
  const availabilityData = Object.entries(data).flatMap(([day, { isAvailable, startTime, endTime }]) => {
    if (isAvailable) {
      const baseDate = new Date().toISOString().split("T")[0];
      return [
        {
          day: day.toUpperCase(),
          startTime: new Date(`${baseDate}T${startTime}:00Z`),
          endTime: new Date(`${baseDate}T${endTime}:00Z`),
        },
      ];
    }
    return [];
  });

  // If availability already exists, update it
  if (user.availability) {
    await db.availability.update({
      where: { id: user.availability.id },
      data: {
        timeGap: data.timeGap,
        days: {
          deleteMany: {}, // Delete existing days
          create: availabilityData, // Create new days
        },
      },
    });
  } else {
    // If availability doesn't exist, create a new one
    await db.availability.create({
      data: {
        userId: user.id,
        timeGap: data.timeGap,
        days: {
          create: availabilityData,
        },
      },
    });
  }

  return { success: true };
}
