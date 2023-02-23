import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Movies from "../entities";
import { tMovie } from "../interfaces";
import { movieSchema } from "../schemas";

const retrieveMovieService = async (movieId: number): Promise<tMovie> => {

    const movieRepo: Repository<Movies> = AppDataSource.getRepository(Movies);
    
    const movie  = await movieRepo.findOneBy({ id: movieId });

    const retrieveMovie: tMovie = movieSchema.parse(movie)

    return retrieveMovie
  };

export default retrieveMovieService