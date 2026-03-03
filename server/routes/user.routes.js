import express from "express";
import { createUser, getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

export const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);