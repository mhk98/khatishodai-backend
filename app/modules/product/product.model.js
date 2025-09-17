const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_type: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    brand_title: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    category_title: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    subCategoryItem_title: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    seller_title: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    default_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gallery_images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },
  });

  return Product;
};
