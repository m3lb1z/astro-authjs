import { loginUser, logout, registerUser } from "./auth";
import { getProductsByPage } from "@actions/products/get-products.action";
import { getProductBySlug } from "./products/get-product-by-slug.action";
import { loadProductsFromCart } from "./cart/load-products-from-cart.action";
import { createUpdateProduct } from "./products/create-update-product.action";

export const server = {
  loginUser,
  logout,
  registerUser,
  getProductsByPage,
  getProductBySlug,
  loadProductsFromCart,
  createUpdateProduct,
};
