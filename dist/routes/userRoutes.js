"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.get("/fetch/groceryItems/", userController_1.fetchGroceryItemsForUserController);
userRouter.put("/update/groceryItems/", userController_1.updateGroceryItemsForUserController);
exports.default = userRouter;
