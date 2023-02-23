import { Request, Response } from "express";
import { tMovie, tMovieWithoutId } from "../interfaces";
import { createMovieService } from "../services";


const createMovieController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const payload: tMovieWithoutId = req.body;
   
    const newMovie: tMovie  = await createMovieService(payload);
  
    return res.status(201).json(newMovie);
  };
  
export default createMovieController