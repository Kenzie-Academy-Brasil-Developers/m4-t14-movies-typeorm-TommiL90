import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { tMovie } from "../interfaces";

const paginatedListMoviesService = async (sortBy: string | undefined, sortOrder: string, pageNumber: number, pageSize: number): Promise<{
    items: tMovie[];
    total: number;
}> => {
    const movieRepo = AppDataSource.getRepository(Movie);

    const countList: number = await movieRepo.count()

    if(sortBy){
        const [items, total] = await movieRepo.findAndCount({
            order: {
                [sortBy]: sortOrder || "price"
            },
            skip: (pageNumber - 1) * pageSize,
            take:  pageSize
        });

        const data = {
            items,
            total
        }
    
        return data
    }

    const [items, total] = await movieRepo.findAndCount({

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