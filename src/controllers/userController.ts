import { Request, Response } from "express";
import {
  fetchGroceryItemsForUserService,
  updateGroceryItemsForUserService,
} from "../services/userServices";

export const fetchGroceryItemsForUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const records = await fetchGroceryItemsForUserService();
    res.status(200).json({ data: JSON.stringify(records) });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.errors || err.message || err.sqlMessage });
  }
};

export const updateGroceryItemsForUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const items = req.body;
    const data = await updateGroceryItemsForUserService(items);
    res.status(200).json({ data: JSON.stringify(data) });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.errors || err.message || err.sqlMessage });
  }
};
