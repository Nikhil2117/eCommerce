import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Incorrect username or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} =  req.body;
  const userExists = await User.find({email});

  console.log(userExists);
  if(userExists.length > 0){
    res.status(400);
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password });

  if(user){
    generateToken(res, user._id)
    res.status(201).json({ message: "user created successfully", email, name});
  }else{
    res.status(400).send('Invalid User Data')
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({ message: "Logged Out Successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    res.status(302).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  }else{
    res.status(402)
    throw new Error('User Not Found')
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password){
      user.password = req.body.password || user.password;
    }
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.status(200).json({
      message:'User updated successfully',
      name : updatedUser.name
    })

  }else{
    res.status(402)
    throw new Error('User Not Found')
  }
});


// Admin routes
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users");
});

const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User by Id");
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
  updateUserProfile,
};
