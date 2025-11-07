// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const SubCategory = sequelize.define('SubCategory', {
//     subCategoryId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },

//     subCategoryHeading: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//       });

//   return SubCategory;
// };

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SubCategory = sequelize.define(
    "SubCategory",
    {
      subCategoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      subCategoryHeading: {
        type: DataTypes.STRING(255), // safe side: length define করো
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      tableName: "SubCategories", // optional: টেবিলের নাম fix করে দাও
    }
  );

  return SubCategory;
};
