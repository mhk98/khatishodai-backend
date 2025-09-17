const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const Review = db.review;

const insertIntoDB = async (data) => {
  // Insert into database
  const result = await Review.create(data);
  return result;
};

const getAllFromDB = async (options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  // Try to findReviews matching `title`
  let result = await Review.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order:
      options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [["createdAt", "ASC"]],
  });

  const total = await Review.count({ where: whereConditions });

  // If noReviews are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};

const getDataById = async (id) => {
  const result = await Review.findAll({
    where: {
      product_id: id,
    },
  });

  return result;
};
const getArrivalDataById = async () => {
  const result = await Review.findAll({
    where: {
      Review_type: "arrival",
    },
  });

  return result;
};

const deleteIdFromDB = async (id) => {
  const result = await Review.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

const updateOneFromDB = async (id, data) => {
  const result = await Review.update(data, {
    where: {
      id: id,
    },
  });

  return result;
};

const getAllFromDBWithoutQuery = async () => {
  const result = await Review.findAll();

  return result;
};

const ReviewService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
  getAllFromDBWithoutQuery,
  getArrivalDataById,
};

module.exports = ReviewService;
