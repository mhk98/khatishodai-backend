const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },

    email: {
      type: DataTypes.TEXT, // Consider using STRING with length instead of TEXT for email
      allowNull: false,
      validate: {
        isEmail: true, // Adds built-in email validation at the model level
      },
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rating: {
      // Missing rating field — add it!
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });

  return Review;
};
