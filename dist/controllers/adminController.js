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
exports.updateGroceryItemController = exports.deleteGroceryItemController = exports.fetchGroceryItemsController = exports.insertGroceryItemsController = void 0;
const adminService_1 = require("../services/adminService");
const insertGroceryItemsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryItems = req.body;
        yield (0, adminService_1.insertGroceryItemsService)(groceryItems);
        res.status(201).json({ mssg: "Items added to the system" });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.errors || err.message || err.sqlMessage });
    }
});
exports.insertGroceryItemsController = insertGroceryItemsController;
const fetchGroceryItemsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, adminService_1.fetchGroceryItemsService)();
        res.status(200).json({ data: JSON.stringify(records) });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.errors || err.message || err.sqlMessage });
    }
});
exports.fetchGroceryItemsController = fetchGroceryItemsController;
const deleteGroceryItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemName = req.query.name;
        yield (0, adminService_1.deleteGroceryItemService)(itemName);
        res.status(200).json({ mssg: `${itemName} deleted from the system` });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.errors || err.message || err.sqlMessage });
    }
});
exports.deleteGroceryItemController = deleteGroceryItemController;
const updateGroceryItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = req.body;
        yield (0, adminService_1.updateGroceryItemService)(item);
        res.status(200).json({ mssg: "item updated" });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.errors || err.message || err.sqlMessage });
    }
});
exports.updateGroceryItemController = updateGroceryItemController;
