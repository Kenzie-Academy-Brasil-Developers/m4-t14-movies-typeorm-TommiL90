import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Movie }from "../entities";
import { AppError } from "../error";
import { tMovie } from "../interfaces";
import { listMoviesService } from "../services";

const verifyNameExistMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieName: string = request.body.name;
  const idMovie: number = Number(request.params.id);

  const userRepo = AppDataSource.getRepository(Movie);

  const movie = await userRepo.findOneBy({ name: movieName });

  if (request.method === "PATCH" ) {

    if(movieName){

      // const listMovies: tMovie[] = await listMoviesService();
      // const filteredList: tMovie[] = listMovies.filter(
      //   (movie) => movie.id !== idMovie
      // );
  
      // const nameExists: boolean = filteredList.some(
      //   (el) => el.name === movieName
      // );
  
      if (movie) {
        throw new AppError(
          "Movie already exists.",
          409
        );
      }
    }

    return next();
  }

  if (movie) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default verifyNameExistMiddleware;
