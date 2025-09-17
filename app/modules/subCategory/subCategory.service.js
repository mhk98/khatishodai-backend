const db = require("../../../models");
const SubCategory = db.subCategory;

const insertIntoDB = async (data) => {
  console.log("data", data);
  const result = await SubCategory.create(data);

  return result;
};

const getAllFromDB = async () => {
  const result = await SubCategory.findAll();
  return result;
};

// const getAllFromDB = async () => {
//   const categories = await Category.findAll({
//     include: [{
//       model: SubCategory,

//       include: [{
//         model: SubCategoryItem,

//       }],
//     }],
//     order: [['createdAt', 'DESC']], // createdAt অনুযায়ী DESC অর্ডারে সাজানো
//   });

//   const result = categories.map(menu => ({
//     icon: menu.default_image,
//     text: menu.categoryTitle,
//     extraClass: menu.extraClass,
//     mega: menu.mega,
//     megaContent: menu.subCategories?.map(megaMenu => ({
//       heading: megaMenu.subCategoryHeading,
//       megaItems: megaMenu.subCategoryItems?.map(item => ({
//         text: item.subCategoryItemTitle,
//       })),
//     })) || [],
//   }));

//   return result;
// };

const updateOneFromDB = async (id, payload) => {
  const { subCategoryHeading, category_id } = payload;

  console.log("payload", payload, id);
  const data = {
    subCategoryHeading:
      subCategoryHeading === undefined ? undefined : subCategoryHeading,
    category_id: category_id === undefined ? undefined : category_id,
  };
  const result = await SubCategory.update(data, {
    where: {
      subCategoryId: id,
    },
  });

  return result;
};

const deleteOneFromDB = async (id) => {
  const result = await SubCategory.destroy({
    where: {
      subCategoryId: id,
    },
  });

  return result;
};

const SubCategoryService = {
  insertIntoDB,
  updateOneFromDB,
  deleteOneFromDB,
  getAllFromDB,
};

module.exports = SubCategoryService;
