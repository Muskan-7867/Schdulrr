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

// Define the event schema
export const eventSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required" })
        .max(100, { message: "Title must be 100 characters or less" }),
    description: z
        .string()
        .min(1, { message: "Description is required" })
        .max(500, { message: "Description must be 500 characters or less" }), 
    duration: z
        .number()
        .int({ message: "Duration must be an integer" }) 
        .positive({ message: "Duration must be a positive number" }), 
    isPrivate: z.boolean(),
});


//day schema

export const daySchema = z.object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
})
.refine(
    (data) =>{
        if(data.isAvailable){
            return data.startTime <  data.endTime
        }
        return true;
    },
    {
        message: "End time must be more than start Time.",
        path:['endTime']
    }
);

export const availabilitySchema= z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
    timeGap: z.number().min(0,"Time gap must be 0 or more than minutes").int(),
});

export const bookingSchema = z.object({
    name:z.string().min(1, 'name is required'),
    email: z.string().email('invalid email'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    time:z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
    additionalInfo: z.string().optional(),
})