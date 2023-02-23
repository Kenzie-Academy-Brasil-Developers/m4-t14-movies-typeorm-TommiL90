import { Request, Response } from "express";
import { tMovie } from "../interfaces";
import { listMoviesService } from "../services";


const listMoviesController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
  
    const listMovies: tMovie[]  = await listMoviesService();
  
    return res.status(200).json(listMovies);
  };
  
export default listMoviesController
