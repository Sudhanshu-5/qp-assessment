import * as yup from "yup";
import { Category } from "../enums/grocery";

export const groceryItemSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  inventory: yup.number().required(),
  category: yup.string().oneOf(Object.values(Category)),
});
