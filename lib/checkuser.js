import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { db } from './prisma'; // Ensure db is correctly instantiated

export const checkuser = async () => {
    // Retrieve the current user from Clerk
    const user = await currentUser();

    // If there's no user, return null
    if (!user) {
        console.warn("No user is currently authenticated.");
        return null;
    }

    try {
        // Attempt to find an existing user in the database
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkuserid: user.id, // Ensure this matches your Prisma schema
            },
        });

        // If the user already exists, return the user
        if (loggedInUser) {
            return loggedInUser;
        }

        // Create a new username based on the user's first and last name
        const name = `${user.firstName} ${user.lastName}`.trim();
        const username = name.split(' ').join('-') + user.id.slice(-4);

        // Update the Clerk user with the new username
        await clerkClient.users.updateUser(user.id, {
            username,
        });

        // Create a new user in your own database
        const newUser = await db.user.create({
            data: {
                clerkuserid: user.id, // Ensure this matches your Prisma schema
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0]?.emailAddress || null, // Safely access email
                username,
            },
        });

        return newUser;

    } catch (error) {
        console.error("Error in checkuser function:", error);
        throw error; // Rethrow the error to allow higher-level handling if needed
    }
};
