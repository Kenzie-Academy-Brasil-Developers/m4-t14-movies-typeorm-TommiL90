import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Movies from "../entities";
import { tMovie } from "../interfaces";
import { tMovieUpdate } from "../interfaces/movies.interfaces";
import { movieSchema, updateMovieSChema } from "../schemas";

const updateMovieService = async (payload: tMovieUpdate, id: number): Promise<tMovie> => {

    const movieRepo: Repository<Movies> = AppDataSource.getRepository(Movies);
    const movie = await movieRepo.findOneBy({
        id: id
    });

    const updateMovie = {
        ...movie,
        ...payload
    }

    const updatedMovie = movieSchema.parse(updateMovie)
  
    await movieRepo.save(updatedMovie);
  
    return updatedMovie;
}

export default updateMovieService