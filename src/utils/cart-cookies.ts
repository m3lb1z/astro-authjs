import Cookies from "js-cookie";
import type { CartItem } from "src/interfaces/cart-item";

export class CartCookiesClient {
  static getCart(): CartItem[] {
    return JSON.parse(Cookies.get("cart") ?? "[]") as CartItem[];
  }

  static addItem(cartItem: CartItem): CartItem[] {
    const cart = CartCookiesClient.getCart();
    const itemInCart = cart.find(
      (item) =>
        item.productId === cartItem.productId && item.size === cartItem.size
    );

    if (itemInCart) {
      itemInCart.quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });

    return cart;
  }

  static removeItem(productId: string, size: string): CartItem[] {
    const cart = CartCookiesClient.getCart();

    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    );

    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });

    return updatedCart;
  }
}
