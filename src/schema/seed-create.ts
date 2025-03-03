import { FIELD_PARAMS } from "@/constant/params";
import { z } from "zod";

export const seedSchema = z.object({
    [FIELD_PARAMS.NUM_OF_SEEDS]: z
        .string()
        .min(1, "Please enter seed number") // Ensure it's not empty
        .refine((val) => /^\d+$/.test(val), {
            message: "Must be a valid number", // Check if it's only digits
        })
        .refine((val) => Number(val) >= 1 && Number(val) <= 99, {
            message: "Value must be between 01 and 99", // Ensure it's within range
        }),
});

export type SeedData = z.infer<typeof seedSchema>;