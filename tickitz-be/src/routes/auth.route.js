const { Router } = require("express");

const authContoller = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");
const authRouter = Router();

// login
authRouter.post("/", authMiddleware.checkVerify, authContoller.login);
authRouter.post("/register", authContoller.register);
authRouter.patch("/verify/:email", authContoller.verify);
// authRouter.patch("/otp")
authRouter.get(
  "/private",
  authMiddleware.checkToken,
  authContoller.privateAcces
);
authRouter.patch("/logout", authMiddleware.checkToken, authContoller.logOut);
authRouter.patch("/otp", authContoller.createOtp);
authRouter.patch("/forgot", authContoller.forgot);
authRouter.patch("/reset-password/:otp", authContoller.resetPassword);
authRouter.patch(
  "/change-password",
  authMiddleware.checkToken,
  authContoller.changePassword
);

module.exports = authRouter;
