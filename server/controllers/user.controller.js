import UserModel from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try{
    const users = await UserModel.find();

    if (users.length <= 0){
      return res.status(404).json({
        status: "failed",
        message: "No users found"
      });
    }
    res.status(200).json({
      status: "success",
      count: users.length,
      data: {user: users}
    })
  }
  catch(err){
    console.log("Error fetching users:", err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error"
    });
  }
}

export const createUser = async (req, res) => {
  try{
    const userData = new UserModel(req.body);
    const {email} = userData
    const existingUser = await UserModel.findOne({email});

    console.log("REQUEST BODY:", req.body);

    if(existingUser){
      return res.status(400).json({
        status: "failed",
        message: "User with this email already exists"
      });
    }
    const savedUser = await userData.save();
    res.status(200).json({
      status: "success",
      data: { user: savedUser }
    });
  }
  catch(err){
    console.log("Error creating user:", err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error"
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await UserModel.findById(id);

    if (!currentUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found"
      });
    }
    const savedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: "success",
      data: { user: savedUser }
    });

  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error"
    });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await UserModel.findById(id);
    if (!currentUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found"
      });
    } 
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully"
    })  
  }
  catch (error) {
    console.log("Error deleting user:", error);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error"
    });
  }
}