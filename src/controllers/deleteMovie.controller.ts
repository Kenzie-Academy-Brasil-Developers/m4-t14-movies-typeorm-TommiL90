import { Request, Response } from "express";
import { deleteMovieService } from "../services";

const deleteMovieController = async (req: Request, res: Response) => {

    await deleteMovieService(parseInt(req.params.id))

    return res.status(204).send()
}
  
export default deleteMovieController