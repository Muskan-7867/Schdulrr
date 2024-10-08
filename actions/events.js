"use server";
import { auth } from "@clerk/nextjs/server";
import { eventSchema } from "../app/lib/validators"; // Ensure this path is correct
import { db } from "../lib/prisma";

export async function CreateEvent(data) {
  const { userId } = auth();

  // Check if the user is authenticated
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Validate the data using Zod schema
  let validatedData;
  try {
    validatedData = await eventSchema.parseAsync(data);
    console.log("validate data", validatedData);
  } catch (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }

  // Find the user in the database using Clerk's user ID
  const user = await db.user.findUnique({
    where: { clerkuserid: userId },
  });

  console.log("userfrom db ", user);

  if (!user) {
    throw new Error("User not found");
  }

  // Create the event in the database
  const event = await db.event.create({
    data: {
      ...validatedData,
      userId: user.id, // Link the event to the authenticated user
    },
  });

  console.log("event", event);

  return event; // Return the newly created event
}
