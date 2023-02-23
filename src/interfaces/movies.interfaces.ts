import { DeepPartial } from "typeorm";
import { z } from "zod";
import { createMovieSchema, movieSchema, updateMovieSChema } from "../schemas";


export type tMovie = z.infer<typeof movieSchema>

export type tMovieWithoutId = z.infer<typeof createMovieSchema>

export type tMovieUpdate = DeepPartial<tMovie> //type update = DeepPartial<tMovie>

