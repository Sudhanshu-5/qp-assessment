"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminRouter = express_1.default.Router();
adminRouter.post("/insert/groceryItems/", adminController_1.insertGroceryItemsController);
adminRouter.get("/fetch/groceryItems/", adminController_1.fetchGroceryItemsController);
adminRouter.delete("/delete/groceryItem/", adminController_1.deleteGroceryItemController);
adminRouter.put("/update/groceryItem/", adminController_1.updateGroceryItemController);
exports.default = adminRouter;
