const { Router } = require("express");
const cinemasRouter = Router();
const cinemasController = require("../controllers/cinemas.controller")

cinemasRouter.get('/', cinemasController.getAllCinemas)
cinemasRouter.post('/', cinemasController.addCinemas)
cinemasRouter.get('/:id', cinemasController.getSingleCinemas)
cinemasRouter.patch('/:id', cinemasController.editCinemas)
cinemasRouter.delete('/:id', cinemasController.deleteCinemas)


module.exports = cinemasRouter;