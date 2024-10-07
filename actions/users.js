"use server";
import { db } from "../lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUsername(username) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingusername = await db.user.findUnique({
    where: { username },
  });

  if (existingusername && existingusername.id !== userId) {
    throw new Error("Username is already taken");
  }

  await db.user.update({
    where: { clerkuserid: userId },
    data: { username },
  });

  await clerkClient.users.updateUser(userId, {
    username,
  });
  return { success: true };
}
