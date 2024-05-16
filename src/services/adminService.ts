import { RowDataPacket } from "mysql2/promise";
import { groceryItemSchema } from "../schema/groceryItem";
import { GroceryItem } from "../types/groceryItem";
import { promisePool } from "../utils/poolConnection";

export const insertGroceryItemsService = async (items: Array<GroceryItem>) => {
  try {
    // insert multiple items
    for (const item of items) {
      await groceryItemSchema.validate(item, { strict: true }); // validate schema

      const insertQuery =
        "INSERT INTO grocery_items (name,price,inventory,category) VALUES (?,?,?,?)";
      await promisePool.query(insertQuery, [...Object.values(item)]);
      return { mssg: `${item.name} inserted successfully` };
    }
  } catch (err) {
    throw err;
  }
};

export const fetchGroceryItemsService = async () => {
  try {
    // fetch multiple items
    const fetchQuery = "SELECT * FROM grocery_items";

    const [records] = await promisePool.query(fetchQuery);

    return records;
  } catch (err) {
    throw err;
  }
};

export const deleteGroceryItemService = async (itemName: string) => {
  try {
    // check if item exists
    const selectQuery = `SELECT * FROM grocery_items WHERE name=?`;

    const [fetchedRows] = await promisePool.query<RowDataPacket[]>(
      selectQuery,
      [itemName]
    );

    // if item exists, delete
    if (fetchedRows.length > 0) {
      // delete item
      const deleteQuery = "DELETE FROM grocery_items WHERE name = ?";

      await promisePool.query(deleteQuery, itemName);
      return { mssg: `${itemName} deleted successfully` };
    } else {
      return { mssg: `Item ${itemName} doest not exists` };
    }
  } catch (err) {
    throw err;
  }
};

export const updateGroceryItemService = async (item: GroceryItem) => {
  try {
    // check if item exists
    const selectQuery = `SELECT * FROM grocery_items WHERE name=?`;

    const [fetchedRows] = await promisePool.query<GroceryItem[]>(selectQuery, [
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
      const updateQuery = `UPDATE grocery_items SET ${updateFields} WHERE name = ?`;

      await promisePool.query<GroceryItem[]>(updateQuery, queryParams);
      return { mssg: `Item updated successfully` };
    } else {
      return { mssg: `Item ${item.name} doest not exists` };
    }
  } catch (err) {
    throw err;
  }
};
