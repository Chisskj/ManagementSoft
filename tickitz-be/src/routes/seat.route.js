const { Router } = require("express");
const seatRouter = Router();

const seatController = require("../controllers/seat.controller");
const authMiddleware = require("../middleware/auth");

seatRouter.get("/all/:show_id", seatController.getSeat);
seatRouter.post("/order", authMiddleware.checkToken, seatController.orderSeat);

module.exports = seatRouter;
