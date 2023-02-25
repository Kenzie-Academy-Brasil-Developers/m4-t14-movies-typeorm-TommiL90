import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const verifyIdMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {

    const idMovie: number = Number(request.params.id)

    const movieRepo = AppDataSource.getRepository(Movie);

    const movie = await movieRepo.findOneBy({ id: idMovie });

    if (!movie) {
        throw new AppError("Movie not found", 404);
      }
  
    return next();
  };

export default verifyIdMiddleware