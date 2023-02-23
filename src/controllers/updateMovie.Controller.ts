import { Request, Response } from "express";
import { tMovie, tMovieUpdate } from "../interfaces";
import { updateMovieService } from "../services";

const updateMovieController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id: number = Number(req.params.id);
    const data: tMovieUpdate = req.body
   
    const updateMovie: tMovie  = await updateMovieService(data, id);
  
    return res.status(201).json(updateMovie);
  };
  
export default updateMovieController