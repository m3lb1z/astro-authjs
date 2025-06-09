import { db, Role, User, Product, ProductImage } from "astro:db";
import { v4 as UUID } from "uuid";
import bcrypt from "bcryptjs";
import { seedProducts } from "./seed-data";

// https://astro.build/db/seed
export default async function seed() {
  // Create roles
  const roles = [
    { id: "admin", name: "Admin" },
    { id: "user", name: "User" },
  ];

  // Create users
  const users = [
    {
      id: "ABC-123-JOHN",
      name: "john doe",
      email: "john@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "user",
    },
    {
      id: "ABC-123-JANE",
      name: "jane doe",
      email: "jane@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "user",
    },
    {
      id: "ABC-123-ALICE",
      name: "alice smith",
      email: "alice@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "admin",
    },
  ];

  // Insert roles into the database
  for (const role of roles) {
    await db.insert(Role).values(role);
  }

  // Insert users into the database
  for (const user of users) {
    await db.insert(User).values(user);
  }

  const queries: any = [];
  seedProducts.forEach((product) => {
    const newProduct = {
      id: UUID(),
      description: product.description,
      gender: product.gender,
      price: product.price,
      sizes: product.sizes.join(","),
      slug: product.slug,
      stock: product.stock,
      tags: product.tags.join(","),
      title: product.title,
      type: product.type,
      userId: users[2].id,
    };
    queries.push(db.insert(Product).values(newProduct));

    product.images.forEach((image) => {
      const img = {
        id: UUID(),
        productId: newProduct.id,
        image,
      };

      queries.push(db.insert(ProductImage).values(img));
    });
  });

  await db.batch(queries);
}
