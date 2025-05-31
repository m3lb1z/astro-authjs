import { loginUser, logout, registerUser } from "./auth";
import { getProductsByPage } from "@actions/products/get-products.action";

export const server = {
  loginUser,
  logout,
  registerUser,
  getProductsByPage,
};
