import { RowDataPacket } from "mysql2";
import { Category } from "../enums/grocery";

export interface GroceryItem extends RowDataPacket {
  id?: number;
  name: string;
  price: number;
  inventory: number; // no of goods/products available
  category?: Category;
}

export interface OrderGroceryItems {
  name: string;
  inventory: number;
}
