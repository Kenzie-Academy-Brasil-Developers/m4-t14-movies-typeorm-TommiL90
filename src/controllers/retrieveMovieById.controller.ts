import { Request, Response } from "express";
import { tMovie } from "../interfaces";
import { retrieveMovieService } from "../services";

const retrieveMovieByIdController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    const idMovie: number = Number(req.params.id)
  
    const movie: tMovie  = await retrieveMovieService(idMovie);
  
    return res.status(200).json(movie);
  };
  
export default retrieveMovieByIdController
