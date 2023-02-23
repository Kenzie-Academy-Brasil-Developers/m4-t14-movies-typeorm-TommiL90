import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  retrieveMovieByIdController,
  updateMovieController,
} from "../controllers";
import {
  validateBodyMiddleware,
  verifyIdMiddleware,
  verifyNameExistMiddleware,
} from "../middlewares";
import { createMovieSchema, updateMovieSChema } from "../schemas";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  verifyNameExistMiddleware,
  validateBodyMiddleware(createMovieSchema),
  createMovieController
);
moviesRoutes.get("", listMoviesController);
moviesRoutes.get("/:id", verifyIdMiddleware, retrieveMovieByIdController);
moviesRoutes.patch(
  "/:id",
  verifyIdMiddleware,
  verifyNameExistMiddleware,
  validateBodyMiddleware(updateMovieSChema),
  updateMovieController
);
moviesRoutes.delete("/:id", verifyIdMiddleware, deleteMovieController);

export default moviesRoutes;
