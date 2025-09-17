const { uploadSingle } = require("../../middlewares/upload");
const SubCategoryController = require("./subCategory.controller");
const router = require("express").Router();

router.post("/create", SubCategoryController.insertIntoDB);
router.get("/", SubCategoryController.getAllFromDB);
// router.get("/", CategoryController.getDataById);
router.delete("/:id", SubCategoryController.deleteOneFromDB);
router.put("/:id", SubCategoryController.updateOneFromDB);

const SubCategoryRoutes = router;
module.exports = SubCategoryRoutes;
