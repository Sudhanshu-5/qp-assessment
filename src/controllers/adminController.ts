import { Request, Response } from "express";
import {
  deleteGroceryItemService,
  fetchGroceryItemsService,
  insertGroceryItemsService,
  updateGroceryItemService,
} from "../services/adminService";
import { GroceryItem } from "../types/groceryItem";

export const insertGroceryItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const groceryItems: Array<GroceryItem> = req.body;
    await insertGroceryItemsService(groceryItems);
    res.status(201).json({ mssg: "Items added to the system" });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.errors || err.message || err.sqlMessage });
  }
};

export const fetchGroceryItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const records = await fetchGroceryItemsService();
    res.status(200).json({ data: JSON.stringify(records) });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.errors || err.message || err.sqlMessage });
  }
};

export const deleteGroceryItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const itemName: string = req.query.name as string;

    await deleteGroceryItemService(itemName);

    res.status(200).json({ mssg: `${itemName} deleted from the system` });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.errors || err.message || err.sqlMessage });
  }
};

export const updateGroceryItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const item: GroceryItem = req.body;

    await updateGroceryItemService(item);

    res.status(200).json({ mssg: "item updated" });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.errors || err.message || err.sqlMessage });
  }
};
