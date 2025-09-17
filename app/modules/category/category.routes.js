const { uploadSingle } = require("../../middlewares/upload");
const CategoryController = require("./category.controller");
const router = require("express").Router();

router.post("/create", uploadSingle, CategoryController.insertIntoDB);
router.get("/", CategoryController.getAllFromDB);
router.delete("/:id", CategoryController.deleteOneFromDB);
router.put("/:id", uploadSingle, CategoryController.updateOneFromDB);

const CategoryRoutes = router;
module.exports = CategoryRoutes;
