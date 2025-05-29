import { db, Role, User } from "astro:db";
import { v4 as UUID } from "uuid";
import bcrypt from "bcryptjs";

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
      id: UUID(),
      name: "John Doe",
      email: "john@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "user",
    },
    {
      id: UUID(),
      name: "Jane Smith",
      email: "jane@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "user",
    },
    {
      id: UUID(),
      name: "Alice Johnson",
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
}
