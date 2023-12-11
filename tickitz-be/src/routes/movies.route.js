const { Router } = require("express");
const moviesRouter = Router();

const moviesController = require("../controllers/movies.controller");
const imageMoviesUploader = require('../middleware/imageMoviesUploader')
const memoryUpload = require('../middleware/memoryUpload')

moviesRouter.get('/', moviesController.getAllMovies)
moviesRouter.get('/:id', moviesController.getSingleMovies)
moviesRouter.post('/', memoryUpload.single("image"), moviesController.addMovies)
moviesRouter.patch('/:id', memoryUpload.single("image"), imageMoviesUploader.cloudUploadMovies, moviesController.editMovies)
moviesRouter.delete('/:id', moviesController.deleteMovies)

module.exports = moviesRouter;