"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertGroceryItemController = void 0;
const adminService_1 = require("../services/adminService");
const insertGroceryItemController = (req, res, pool) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryItem = req.body;
        const items = yield (0, adminService_1.insertGroceryItemService)(groceryItem, pool);
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: err.mssg });
    }
});
exports.insertGroceryItemController = insertGroceryItemController;
