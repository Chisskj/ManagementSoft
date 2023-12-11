const { Router } = require("express");
const bookingRouter = Router();

const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/auth");

bookingRouter.get(
  "/",
  authMiddleware.checkToken,
  bookingController.createBooking
);

module.exports = bookingRouter;
