import { AppDataSource } from "../data-source"
import Movies from "../entities"

const deleteMovieService = async (id: number): Promise<void> => {

    const movieRepo = AppDataSource.getRepository(Movies)

    const movie = await movieRepo.findOne({
        where: {
            id: id
        }
    })

    await movieRepo.remove(movie!)

}

export default deleteMovieService