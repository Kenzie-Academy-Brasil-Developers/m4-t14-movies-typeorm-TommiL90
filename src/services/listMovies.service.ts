import { AppDataSource } from "../data-source";
import Movies from "../entities";
import { tMovie } from "../interfaces";

const listMoviesService = async (): Promise<tMovie[]> => {
    const userRepo = AppDataSource.getRepository(Movies);
    const movieList = await userRepo.find({});

    return movieList
  };

export default listMoviesService  