const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const { doubleUpload } = require("../../middlewares/upload");
const BlogController = require("./blog.controller");
const router = require("express").Router();

router.post("/create", doubleUpload, BlogController.insertIntoDB);
router.get("/", BlogController.getAllFromDB);
router.get("/:id", BlogController.getDataById);
router.delete("/:id", BlogController.deleteIdFromDB);
router.put("/:id", doubleUpload, BlogController.updateOneFromDB);

const BlogRoutes = router;
module.exports = BlogRoutes;
