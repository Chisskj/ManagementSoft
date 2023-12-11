const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const moviesRouter = require("./movies.route");
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");
const bookingRouter = require("./booking.route");
const seatRouter = require("./seat.route");

const transactionRouter = require("./transaction.route");
const showRouter = require("./show.routes");
const cinemasRouter = require("./cinemas.route");
const locationRouter = require("./location.route.js");

masterRouter.use("/movies", moviesRouter);
masterRouter.use("/", welcomeRouter);
masterRouter.use("/show", showRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/profile", profileRouter);
masterRouter.use("/booking", bookingRouter);
masterRouter.use("/seat", seatRouter);
masterRouter.use("/transaction", transactionRouter);
masterRouter.use("/cinemas", cinemasRouter);
masterRouter.use("/location", locationRouter);

module.exports = masterRouter;
