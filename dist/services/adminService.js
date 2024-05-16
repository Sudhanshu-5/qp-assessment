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
exports.updateGroceryItemService = exports.deleteGroceryItemService = exports.fetchGroceryItemsService = exports.insertGroceryItemsService = void 0;
const groceryItem_1 = require("../schema/groceryItem");
const poolConnection_1 = require("../utils/poolConnection");
const insertGroceryItemsService = (items) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // insert multiple items
        for (const item of items) {
            yield groceryItem_1.groceryItemSchema.validate(item, { strict: true }); // validate schema
            const insertQuery = "INSERT INTO GROCERY_ITEMS (name,price,inventory,category) VALUES (?,?,?,?)";
            yield poolConnection_1.promisePool.query(insertQuery, [...Object.values(item)]);
            return { mssg: `${item.name} inserted successfully` };
        }
    }
    catch (err) {
        throw err;
    }
});
exports.insertGroceryItemsService = insertGroceryItemsService;
const fetchGroceryItemsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // fetch multiple items
        const fetchQuery = "SELECT * FROM GROCERY_ITEMS";
        const [records] = yield poolConnection_1.promisePool.query(fetchQuery);
        return records;
    }
    catch (err) {
        throw err;
    }
});
exports.fetchGroceryItemsService = fetchGroceryItemsService;
const deleteGroceryItemService = (itemName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if item exists
        const selectQuery = `SELECT * FROM GROCERY_ITEMS WHERE name=?`;
        const [fetchedRows] = yield poolConnection_1.promisePool.query(selectQuery, [itemName]);
        // if item exists, delete
        if (fetchedRows.length > 0) {
            // delete item
            const deleteQuery = "DELETE FROM GROCERY_ITEMS WHERE name = ?";
            yield poolConnection_1.promisePool.query(deleteQuery, itemName);
            return { mssg: `${itemName} deleted successfully` };
        }
        else {
            return { mssg: `Item ${itemName} doest not exists` };
        }
    }
    catch (err) {
        throw err;
    }
});
exports.deleteGroceryItemService = deleteGroceryItemService;
const updateGroceryItemService = (item) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if item exists
        const selectQuery = `SELECT * FROM GROCERY_ITEMS WHERE name=?`;
        const [fetchedRows] = yield poolConnection_1.promisePool.query(selectQuery, [
            item.name,
        ]);
        // if item exists, update
        if (fetchedRows.length > 0) {
            // generating query params
            const updateFields = Object.keys(item)
                .map((key) => {
                return `${key}=?`;
            })
                .join(",");
            const updateValues = Object.values(item);
            const queryParams = [...updateValues, item.name];
            // update item
            const updateQuery = `UPDATE GROCERY_ITEMS SET ${updateFields} WHERE name = ?`;
            yield poolConnection_1.promisePool.query(updateQuery, queryParams);
            return { mssg: `Item updated successfully` };
        }
        else {
            return { mssg: `Item ${item.name} doest not exists` };
        }
    }
    catch (err) {
        throw err;
    }
});
exports.updateGroceryItemService = updateGroceryItemService;
