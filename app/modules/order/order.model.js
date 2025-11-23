// module.exports = (sequelize, DataTypes) => {
//   const Order = sequelize.define(
//     "Order",
//     {
//       id: {
//         type: DataTypes.STRING, // use STRING, not INTEGER
//         primaryKey: true,
//       },
//       cartProducts: {
//         type: DataTypes.JSON,
//         allowNull: false,
//         defaultValue: {},
//         get() {
//           return JSON.parse(this.getDataValue("cartProducts"));
//         },
//         set(val) {
//           this.setDataValue("cartProducts", JSON.stringify(val));
//         },
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       address: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       city: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       paymentMethod: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       orderStatus: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "Processing",
//       },
//       emailOrPhone: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//         },
//       },
//       postalCode: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       keepUpdate: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       saveInfo: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       total: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       timestamps: true,
//       hooks: {
//         // Generate custom ID before creating
//         async beforeCreate(order) {
//           const lastOrder = await Order.findOne({
//             order: [["createdAt", "DESC"]],
//           });

//           let nextNumber = 1;
//           if (lastOrder && lastOrder.id) {
//             const lastNumber = parseInt(lastOrder.id.replace("KS", ""), 10);
//             if (!isNaN(lastNumber)) {
//               nextNumber = lastNumber + 1;
//             }
//           }

//           order.id = "KS" + String(nextNumber).padStart(3, "0");
//         },
//       },
//     }
//   );

//   return Order;
// };


module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.STRING, // use STRING, not INTEGER
        primaryKey: true,
      },
      cartProducts: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
        get() {
          return JSON.parse(this.getDataValue("cartProducts"));
        },
        set(val) {
          this.setDataValue("cartProducts", JSON.stringify(val));
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Processing",
      },
      emailOrPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      keepUpdate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      saveInfo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      hooks: {
        // Generate custom ID before creating
        async beforeCreate(order) {
          const lastOrder = await Order.findOne({
            order: [["createdAt", "DESC"]],
          });

          let nextNumber = 1;
          if (lastOrder && lastOrder.id) {
            const lastNumber = parseInt(lastOrder.id.replace("KS", ""), 10);
            if (!isNaN(lastNumber)) {
              nextNumber = lastNumber + 1;
            }
          }

          order.id = "KS" + String(nextNumber).padStart(3, "0");
        },
      },
    }
  );

  return Order;
};
