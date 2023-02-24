import { z } from "zod"


export const movieSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(50),
    description: z.string().nullable().optional(),
    duration: z.number().positive().int(),
    price: z.number().positive().int()
})

export const movieCreateSchema = movieSchema.omit({ 
    id: true
})

export const updateMovieSChema = movieCreateSchema.partial()