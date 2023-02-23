import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppDataSource } from "../data-source";
import Movies from "../entities";
import { AppError } from "../error";

const verifyIdMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {

    const idMovie: number = Number(request.params.id)

    const movieRepo = AppDataSource.getRepository(Movies);

    const movie = await movieRepo.findOneBy({ id: idMovie });

    if (!movie) {
        throw new AppError("Movie is not exists.", 400);
      }
  
    return next();
  };

export default verifyIdMiddleware