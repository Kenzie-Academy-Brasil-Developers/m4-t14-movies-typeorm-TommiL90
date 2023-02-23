import { AppDataSource } from "../data-source";
import Movies from "../entities";
import { tMovie } from "../interfaces";

const paginatedListMoviesService = async (sortBy: string, sortOrder: string, pageNumber: number, pageSize: number): Promise<{
    items: tMovie[];
    total: number;
}> => {
    const userRepo = AppDataSource.getRepository(Movies);
    const [items, total] = await userRepo.findAndCount({
        order: {
            [sortBy]: sortOrder 
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
    });

    const data = {
        items,
        total
    }

    return data
  };

export default paginatedListMoviesService  