import currentUser, { clerkClient, EmailAddress } from '@clerk/nextjs/server';
import { db } from './prisma';

export const checkuser = async () => {
    const user = await currentUser;

    if (!user) {
        return null;
    }

    try {
        // Attempt to find an existing user in the database
        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        // If the user already exists, return the user
        if (loggedInUser) {
            return loggedInUser;
        }

        // Create a new username based on the user's first and last name
        const name = `${user.firstName} ${user.lastName}`;
        const username = name.split(' ').join('-') + user.id.slice(-4);

        // Update the Clerk user with the new username
        await clerkClient.users.updateUser(user.id, {
            username,
        });

        // Create a new user in your own database
        const newuser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0]?.emailAddress,
                username,
            },
        });

        return newuser;

    } catch (error) {
        console.error(error);
        throw error; // It's a good idea to rethrow the error for proper debugging.
    }
};
