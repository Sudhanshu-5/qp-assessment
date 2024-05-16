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
exports.updateGroceryItemsForUserController = exports.fetchGroceryItemsForUserController = void 0;
const userServices_1 = require("../services/userServices");
const fetchGroceryItemsForUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, userServices_1.fetchGroceryItemsForUserService)();
        res.status(200).json({ data: JSON.stringify(records) });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.errors || err.message || err.sqlMessage });
    }
});
exports.fetchGroceryItemsForUserController = fetchGroceryItemsForUserController;
const updateGroceryItemsForUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = req.body;
        const data = yield (0, userServices_1.updateGroceryItemsForUserService)(items);
        res.status(200).json({ data: JSON.stringify(data) });
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.errors || err.message || err.sqlMessage });
    }
});
exports.updateGroceryItemsForUserController = updateGroceryItemsForUserController;
