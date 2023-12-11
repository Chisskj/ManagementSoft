const { Router } = require("express");
const locationRouter = Router();

const showController = require("../controllers/show.controller");

locationRouter.get("/:movie_id", showController.getLocation);

module.exports = locationRouter;
