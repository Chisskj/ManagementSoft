const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profile.controller");
const { checkToken } = require("../middleware/auth");
const memoryUpload = require("../middleware/memoryUpload");

profileRouter.get("/", checkToken, profileController.getProfile);
profileRouter.patch(
  "/image",
  checkToken,
  memoryUpload.single("image"),
  profileController.updateProfileImage
);
profileRouter.patch("/", checkToken, profileController.updateProfile);
profileRouter.patch("/poin", checkToken, profileController.updatePoin);
profileRouter.patch("/delete-image", checkToken, profileController.deleteImage);

module.exports = profileRouter;
