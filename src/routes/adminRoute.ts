import express from "express";
import {
  deleteGroceryItemController,
  fetchGroceryItemsController,
  insertGroceryItemsController,
  updateGroceryItemController,
} from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.post("/insert/groceryItems/", insertGroceryItemsController);
adminRouter.get("/fetch/groceryItems/", fetchGroceryItemsController);
adminRouter.delete("/delete/groceryItem/", deleteGroceryItemController);
adminRouter.put("/update/groceryItem/", updateGroceryItemController);

export default adminRouter;
