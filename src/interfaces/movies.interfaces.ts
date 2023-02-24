import { type } from "os";
import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Movie } from "../entities";
import { movieCreateSchema, movieSchema } from "../schemas";


export type tMovie = z.infer<typeof movieSchema>

export type tMovieWithoutId = z.infer<typeof movieCreateSchema>

export type tMovieUpdate = DeepPartial<tMovie> //type update = DeepPartial<tMovie>

export type iMovieRepo = Repository<Movie>

