// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const Category = sequelize.define('Category', {
//     categoryId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },

//     default_image: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     categoryTitle: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     extraClass: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue:"menu-item-has-children has-mega-menu"
//     },

//     subClass: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue:"sub-menu"
//     },

//     mega: {
//       type: DataTypes.BOOLEAN,
//       defaultValue:false,
//       allowNull: false,
//     },

//       });

//   return Category;
// };

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      default_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      categoryTitle: {
        type: DataTypes.STRING(255), // length mention করা ভালো
        allowNull: false,
      },

      extraClass: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "menu-item-has-children has-mega-menu",
      },

      subClass: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "sub-menu",
      },

      mega: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      tableName: "Categories", // optional: টেবিল নাম ফিক্স করতে চাইলে
    }
  );

  return Category;
};
