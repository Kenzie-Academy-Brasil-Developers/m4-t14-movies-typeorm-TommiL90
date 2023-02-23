import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { tMovie } from "../interfaces";

const listMoviesService = async (): Promise<tMovie[]> => {
    const userRepo = AppDataSource.getRepository(Movie);
    const movieList = await userRepo.find({});

    return movieList
  };

export default listMoviesService  