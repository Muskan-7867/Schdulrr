import { z } from "zod";

// Define the username schema
export const usernameSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" }) // Custom error message
        .max(20, { message: "Username cannot exceed 20 characters" }) // Custom error message
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Username can only contain letters, numbers, and underscores", // Custom error message
        }),
});



