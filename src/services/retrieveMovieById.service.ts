import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { tMovie } from "../interfaces";
import { movieSchema } from "../schemas";

const retrieveMovieService = async (movieId: number): Promise<tMovie> => {

    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
    
    const movie  = await movieRepo.findOneBy({ id: movieId });

    const retrieveMovie: tMovie = movieSchema.parse(movie)

    return retrieveMovie
  };

export default retrieveMovieService