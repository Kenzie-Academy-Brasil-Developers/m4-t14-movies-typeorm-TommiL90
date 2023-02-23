import validateBodyMiddleware from "./validateBodyMiddleware.middleware";
import verifyIdMiddleware from "./verifyIdMovieExists.middleware";
import verifyNameExistMiddleware from "./verifyNameExists.middleware";


export { 
    verifyNameExistMiddleware,
    validateBodyMiddleware,
    verifyIdMiddleware
}