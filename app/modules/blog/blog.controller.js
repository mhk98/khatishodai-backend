const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const { BlogFilterAbleFileds } = require("./blog.constants");
const BlogService = require("./blog.service");

const insertIntoDB = catchAsync(async (req, res) => {
  try {
    const { title, type, organization, description } = req.body;

    const { image1, image } = req.files || {};

    const data = {
      title,
      type,
      organization,
      description,
      image: image && image[0] ? image[0].path || "" : "",
      image1: image1 && image1[0] ? image1[0].path || "" : "",
    };

    console.log("data", data);
    const result = await BlogService.insertIntoDB(data);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Blog data created!!",
      data: result,
    });
  } catch (error) {
    console.error("Error inserting Blog:", error.message);
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
    });
  }
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, BlogFilterAbleFileds);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log("filters", req.query);

  const result = await BlogService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog data fetched!!",
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const result = await BlogService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog data fetched!!",
    data: result,
  });
});

const updateOneFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { title, type, organization, description } = req.body;

  const { image1, image } = req.files || {};

  const data = {
    title: title === "" ? undefined : title,
    type: type === "" ? undefined : type,
    organization: organization === "" ? undefined : organization,
    description: description === "" ? undefined : description,
    image: image && image[0] ? image[0].path || "" : "",
    image1: image1 && image1[0] ? image1[0].path || "" : "",
  };

  const result = await BlogService.updateOneFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog update successfully!!",
    data: result,
  });
});

const deleteIdFromDB = catchAsync(async (req, res) => {
  const result = await BlogService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog delete successfully!!",
    data: result,
  });
});

const BlogController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
};

module.exports = BlogController;
