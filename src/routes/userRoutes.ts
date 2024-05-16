import express from "express";
import {
  fetchGroceryItemsForUserController,
  updateGroceryItemsForUserController,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/fetch/groceryItems/", fetchGroceryItemsForUserController);
userRouter.put("/update/groceryItems/", updateGroceryItemsForUserController);

export default userRouter;
