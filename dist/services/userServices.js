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
exports.updateGroceryItemsForUserService = exports.fetchGroceryItemsForUserService = void 0;
const poolConnection_1 = require("../utils/poolConnection");
const fetchGroceryItemsForUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // fetch multiple available items
        const fetchQuery = "SELECT * FROM GROCERY_ITEMS where inventory > 0";
        const [records] = yield poolConnection_1.promisePool.query(fetchQuery);
        return records;
    }
    catch (err) {
        throw err;
    }
});
exports.fetchGroceryItemsForUserService = fetchGroceryItemsForUserService;
const updateGroceryItemsForUserService = (items) => __awaiter(void 0, void 0, void 0, function* () {
    // for now considering only name and qty as input from user while booking
    try {
        for (const item of items) {
            const selectQuery = `SELECT * FROM GROCERY_ITEMS WHERE name=?`;
            // we will get onlu single record here as name is unique
            const [fetchedRow] = yield poolConnection_1.promisePool.query(selectQuery, [
                item.name,
            ]);
            if (fetchedRow && fetchedRow.length > 0) {
                const fetchedItemQty = fetchedRow[0].inventory;
                // if item exists and qty is gt 0; order and update the inventory level
                if (fetchedItemQty > 0) {
                    if (fetchedItemQty >= item.inventory) {
                        // allow order only if available qty is gte requested grocery items
                        // update inventory level
                        item.inventory = fetchedItemQty - item.inventory;
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
                    }
                    else {
                        return {
                            mssg: `Only ${fetchedItemQty} no. of ${item.name} are available. Please update your order`,
                        };
                    }
                }
                else {
                    return { mssg: `Item ${item.name} is not available` };
                }
            }
            else {
                return { mssg: `Item ${item.name} doest not exists` };
            }
        }
        return { mssg: "Order Successfull" };
    }
    catch (err) {
        throw err;
    }
});
exports.updateGroceryItemsForUserService = updateGroceryItemsForUserService;
