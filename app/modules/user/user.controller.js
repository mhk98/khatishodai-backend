const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const UserService = require("./user.service");
// const { UserService } = require("./user.service");

const login = catchAsync(async (req, res) => {
  const result = await UserService.login(req.body);

  // Configure cookie options for token storage (optional: for API responses)
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production", // Secure cookies in production
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: "strict", // Optional: Add for additional security
  };

  // If you are using `res` for cookies in an Express/Next.js API, uncomment this:
  res.cookie("accessToken", result.accessToken, cookieOptions);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully!!",
    data: result,
  });
});

const register = catchAsync(async (req, res) => {
  const { FirstName, LastName, Email, Password, Phone, Role, Address } =
    req.body;

  const cleanRole =
    Role && Role !== "undefined" && Role.trim() !== "" ? Role : "user";

  const data = {
    FirstName,
    LastName,
    Email,
    Password,
    Phone,
    Role: cleanRole,
    Address,
    image: req.file ? req.file.path : undefined,
  };

  console.log("Registerdata", data);

  const result = await UserService.register(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User register successfully!!",
    data: result,
  });
});

const getAllUserFromDB = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await UserService.getAllUserFromDB(options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User data fetched!!",
    meta: result.meta,
    data: result.data,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await UserService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User data fetched!!",
    data: result,
  });
});

const updateUserFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log("userId", id);
  const { FirstName, LastName, Email, Phone, Role, newPassword } = req.body;

  let Password;

  // ✅ শুধু তখনই hash করবে যদি newPassword থাকে
  if (newPassword && newPassword.trim() !== "") {
    const salt = await bcrypt.genSalt(10);
    Password = await bcrypt.hash(newPassword, salt);
  }
  const data = {
    FirstName: FirstName === "" ? undefined : FirstName,
    LastName: LastName === "" ? undefined : LastName,
    Email: Email === "" ? undefined : Email,
    Phone: Phone === "" ? undefined : Phone,
    Role: Role === "" ? undefined : Role,
    Password: Password === "" ? undefined : Password,
    image: req.file === undefined ? undefined : req.file.path,
  };

  // console.log('userData', data);

  console.log(id);
  const result = await UserService.updateUserFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User update successfully!!",
    data: result,
  });
});

const deleteUserFromDB = catchAsync(async (req, res) => {
  const result = await UserService.deleteUserFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User delete successfully!!",
    data: result,
  });
});

const UserController = {
  getAllUserFromDB,
  login,
  register,
  getUserById,
  updateUserFromDB,
  deleteUserFromDB,
};

module.exports = UserController;
