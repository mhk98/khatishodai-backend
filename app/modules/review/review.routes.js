const ReviewController = require("./review.controller");
const router = require("express").Router();

// router.post("/create", uploadSingle, uploadMultiple, ReviewController.insertIntoDB);

router.post("/create", ReviewController.insertIntoDB);
router.get("/", ReviewController.getAllFromDB);
router.get("/:id", ReviewController.getDataById);
router.delete("/:id", ReviewController.deleteIdFromDB);

const ReviewRoutes = router;
module.exports = ReviewRoutes;
