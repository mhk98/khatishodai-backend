const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const SubCategoryService = require("./subCategory.service");

// Controller method to insert categories into the database
const insertIntoDB = catchAsync(async (req, res) => {
  const result = await SubCategoryService.insertIntoDB(req.body);

  // Send response with success message and result data
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category data created successfully!",
    data: result, // assuming result contains relevant data to send back
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await SubCategoryService.getAllFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category data fetched!!",
    // meta: result.meta,
    data: result,
  });
});

const updateOneFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  console.log("subcategory", req.body);

  const result = await SubCategoryService.updateOneFromDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category update successfully!!",
    data: result,
  });
});

const deleteOneFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SubCategoryService.deleteOneFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category delete successfully!!",
    data: result,
  });
});

const SubCategoryController = {
  insertIntoDB,
  updateOneFromDB,
  deleteOneFromDB,
  getAllFromDB,
};

module.exports = SubCategoryController;
