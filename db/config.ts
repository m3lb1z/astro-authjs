import { defineDb, defineTable, column } from "astro:db";

// Define the User table separately
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text(),
    password: column.text(),
    createdAt: column.date({ default: new Date() }),
    role: column.text({ references: () => Role.columns.id }),
  },
});

// Define the Role table
const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
  },
});

// Define the Product table
const Product = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    description: column.text(),
    gender: column.text(),
    price: column.number(),
    sizes: column.text(),
    slug: column.text({ unique: true }),
    stock: column.number(),
    tags: column.text(),
    title: column.text(),
    type: column.text(),
    userId: column.text({ references: () => User.columns.id }),
  },
});

// Define the ProductImage table
const ProductImage = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    productId: column.text({ references: () => Product.columns.id }),
    image: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Role,
    Product, // Add Product table
    ProductImage, // Add ProductImage table
  },
});
