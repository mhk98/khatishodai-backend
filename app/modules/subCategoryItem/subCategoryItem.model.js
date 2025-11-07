// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const SubCategoryItem = sequelize.define('SubCategoryItem', {
//     subCategoryItemId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },

//     subCategoryItemTitle: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//       });

//   return SubCategoryItem;
// };

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SubCategoryItem = sequelize.define(
    "SubCategoryItem",
    {
      subCategoryItemId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      subCategoryItemTitle: {
        type: DataTypes.STRING(255), // length define করলে ভালো
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      tableName: "SubCategoryItems", // টেবিল নাম fixed রাখতে চাইলে
    }
  );

  return SubCategoryItem;
};
