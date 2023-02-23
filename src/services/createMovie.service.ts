import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { tMovie, tMovieWithoutId } from "../interfaces";
import { movieSchema } from "../schemas";



const createMovieService = async (payload: tMovieWithoutId): Promise<tMovie> => {

    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
    const movie = movieRepo.create(payload);
  
    await movieRepo.save(movie);

    const newMovie = movieSchema.parse(movie)
  
    return newMovie;
}

export default createMovieService

