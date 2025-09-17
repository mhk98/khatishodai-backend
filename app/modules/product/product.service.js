const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const { ProductSearchableFields } = require("./product.constants");
const Product = db.product;
const Brand = db.brand;
const Category = db.category;
const SubCategoryItem = db.subCategoryItem;
const Seller = db.seller;

const insertIntoDB = async (data, image, images) => {
  if (!images || images.length === 0) {
    throw new Error("No files uploaded");
  }

  // ✅ images is already an array of paths
  const imageUrls = images.map((file) => file);

  const {
    title,
    short_description,
    description,
    price,
    category_id,
    subCategoryItem_id,
  } = data;

  const info = {
    title,
    short_description,
    description,
    price,
    category_id,
    subCategoryItem_id,
    default_image: image, // ✅ Store image directly
    gallery_images: JSON.stringify(imageUrls), // ✅ Convert array to string
    product_type: "arrival",
  };

  console.log("ProductData:", info);

  // Insert into database
  const result = await Product.create(info);
  return result;
};

const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  let andConditions = [];

  // Match `title` starting from the search term
  if (searchTerm) {
    andConditions.push({
      title: { [Op.like]: `${searchTerm}%` },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: { [Op.eq]: value },
      })),
    });
  }

  let whereConditions =
    andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Try to find products matching `title`
  let result = await Product.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order:
      options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [["createdAt", "ASC"]],
  });

  // If no products are found with `title`, fallback to `tag`
  if (result.length === 0 && searchTerm) {
    andConditions = [];
    // andConditions.push({
    //   tag: { [Op.like]: `%${searchTerm}%` }, // Matches anywhere in `tag`
    // });

    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        [Op.and]: Object.entries(filterData).map(([key, value]) => ({
          [key]: { [Op.eq]: value },
        })),
      });
    }

    whereConditions = { [Op.and]: andConditions };

    result = await Product.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order:
        options.sortBy && options.sortOrder
          ? [[options.sortBy, options.sortOrder.toUpperCase()]]
          : [["createdAt", "ASC"]],
    });
  }

  const total = await Product.count({ where: whereConditions });

  // If no products are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};

const getDataById = async (id) => {
  const result = await Product.findOne({
    where: {
      id: id,
    },
  });

  return result;
};
const getArrivalDataById = async () => {
  const result = await Product.findAll({
    where: {
      product_type: "arrival",
    },
  });

  return result;
};

const deleteIdFromDB = async (id) => {
  const result = await Product.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

const updateOneFromDB = async (id, data, images, image) => {
  const { brand_id } = data;

  // const brand = await Brand.findOne({
  //   where: {
  //     id: brand_id,
  //   },
  // });

  // const info = {
  //   brand_title: brand.title,
  //   data,
  // };

  if (!images || images.length === 0) {
    throw new Error("No files uploaded");
  }

  // ✅ images is already an array of paths
  const imageUrls = images.map((file) => file);

  const {
    title,
    short_description,
    description,
    price,
    category_id,
    subCategoryItem_id,
  } = data;

  const info = {
    title,
    short_description,
    description,
    price,
    category_id,
    subCategoryItem_id,
    default_image: image, // ✅ Store image directly
    gallery_images: JSON.stringify(imageUrls), // ✅ Convert array to string
    product_type: "arrival",
  };

  const result = await Product.update(info, {
    where: {
      id: id,
    },
  });

  return result;
};

const getAllFromDBWithoutQuery = async () => {
  const result = await Product.findAll();

  return result;
};

const ProductService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
  getAllFromDBWithoutQuery,
  getArrivalDataById,
};

module.exports = ProductService;
