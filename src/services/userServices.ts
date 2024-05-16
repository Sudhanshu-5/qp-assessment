import { RowDataPacket } from "mysql2/promise";
import { groceryItemSchema } from "../schema/groceryItem";
import { GroceryItem, OrderGroceryItems } from "../types/groceryItem";
import { promisePool } from "../utils/poolConnection";

export const fetchGroceryItemsForUserService = async () => {
  try {
    // fetch multiple available items
    const fetchQuery = "SELECT * FROM grocery_items where inventory > 0";

    const [records] = await promisePool.query(fetchQuery);
    return records;
  } catch (err) {
    throw err;
  }
};

export const updateGroceryItemsForUserService = async (
  items: OrderGroceryItems[]
) => {
  // for now considering only name and qty as input from user while booking
  try {
    for (const item of items) {
      const selectQuery = `SELECT * FROM grocery_items WHERE name=?`;

      // we will get onlu single record here as name is unique
      const [fetchedRow] = await promisePool.query<GroceryItem[]>(selectQuery, [
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
            const updateQuery = `UPDATE grocery_items SET ${updateFields} WHERE name = ?`;

            await promisePool.query<GroceryItem[]>(updateQuery, queryParams);
          } else {
            return {
              mssg: `Only ${fetchedItemQty} no. of ${item.name} are available. Please update your order`,
            };
          }
        } else {
          return { mssg: `Item ${item.name} is not available` };
        }
      } else {
        return { mssg: `Item ${item.name} doest not exists` };
      }
    }
    return { mssg: "Order Successfull" };
  } catch (err) {
    throw err;
  }
};
