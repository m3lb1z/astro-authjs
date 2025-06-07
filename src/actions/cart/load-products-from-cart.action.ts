import { defineAction } from "astro:actions";
import { db, eq, inArray, Product, ProductImage } from "astro:db";
import type { CartItem } from "src/interfaces/cart-item";

export const loadProductsFromCart = defineAction({
  accept: "json",
  handler: async (_, { cookies }) => {
    // const cart = (cookies.get("cart")?.json() ?? []) as CartItem[];
    const cart = JSON.parse(cookies.get("cart")?.value ?? "[]") as CartItem[];

    if (cart.length === 0) return [];

    const productIds = cart.map((item) => item.productId);
    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(inArray(Product.id, productIds));

    return cart.map((item) => {
      const dbProduct = dbProducts.find((p) => p.Product.id === item.productId);

      if (!dbProduct)
        throw new Error(
          `Product with ID ${item.productId} not found in the database`
        );

      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;

      return {
        ...item,
        slug,
        title,
        price,
        image: image.startsWith("http")
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
      };
    });
  },
});
