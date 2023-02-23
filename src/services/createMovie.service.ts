import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Movies from "../entities";
import { tMovie, tMovieWithoutId } from "../interfaces";
import { movieSchema } from "../schemas";



const createMovieService = async (payload: tMovieWithoutId): Promise<tMovie> => {

    const movieRepo: Repository<Movies> = AppDataSource.getRepository(Movies);
    const movie = movieRepo.create(payload);
  
    await movieRepo.save(movie);

    const newMovie = movieSchema.parse(movie)
  
    return newMovie;
}

export default createMovieService

