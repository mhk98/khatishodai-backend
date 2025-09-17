const { uploadSingle } = require("../../middlewares/upload");
const SubCategoryItemController = require("./subCategoryItem.controller");
const router = require("express").Router();

router.post("/create", SubCategoryItemController.insertIntoDB);
router.get("/", SubCategoryItemController.getAllFromDB);
// router.get("/", CategoryController.getDataById);
router.delete("/:id", SubCategoryItemController.deleteOneFromDB);
router.put("/:id", SubCategoryItemController.updateOneFromDB);

const SubCategoryItemRoutes = router;
module.exports = SubCategoryItemRoutes;
