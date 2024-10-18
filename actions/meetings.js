import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserMeetings(type = "Upcoming") {
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

  const now = new Date();

  const meetings = await db.booking.findMany({
    where: {
      userId: user.id,
      startTime: type === "upcoming" ? { gte: now } : { lt: now },
    },
    orderBy: {
      startTime: type === "upcoming" ? "asc" : "desc", 
    },
    include: {
      event: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return meetings;
}
