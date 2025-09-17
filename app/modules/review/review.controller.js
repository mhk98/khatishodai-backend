const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const ReviewService = require("./review.service");

const insertIntoDB = catchAsync(async (req, res) => {
  try {
    const result = await ReviewService.insertIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review data created!!",
      data: result,
    });
  } catch (error) {
    console.error("Error inserting Review:", error.message);
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
    });
  }
});

const getAllFromDB = catchAsync(async (req, res) => {
  // const filters = pick(req.query, ReviewFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log("filters", req.query);

  const result = await ReviewService.getAllFromDB(options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review data fetched!!",
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const result = await ReviewService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review data fetched!!",
    data: result,
  });
});

const getArrivalDataById = catchAsync(async (req, res) => {
  const result = await ReviewService.getArrivalDataById();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review data fetched!!",
    data: result,
  });
});

const updateOneFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await ReviewService.updateOneFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review update successfully!!",
    data: result,
  });
});

const deleteIdFromDB = catchAsync(async (req, res) => {
  const result = await ReviewService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review delete successfully!!",
    data: result,
  });
});

const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {
  const result = await ReviewService.getAllFromDBWithoutQuery();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review data fetch!!",
    data: result,
  });
});

const ReviewController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
  getAllFromDBWithoutQuery,
  getArrivalDataById,
};

module.exports = ReviewController;
