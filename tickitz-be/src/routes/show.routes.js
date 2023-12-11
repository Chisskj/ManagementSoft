const { Router } = require("express");
const showRouter = Router();

const showController = require("../controllers/show.controller");

showRouter.post("/", showController.addShow);
showRouter.get("/", showController.getAllShow);
showRouter.patch("/:id", showController.editShow);
showRouter.get("/:id", showController.getSingleShow);
showRouter.delete("/:id", showController.deleteShow);
showRouter.get("/location", showController.getLocation);

module.exports = showRouter;
