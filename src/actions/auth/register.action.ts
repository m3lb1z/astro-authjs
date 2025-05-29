import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, User } from "astro:db"; // Import db and User
import { v4 as UUID } from "uuid"; // Import UUID
import bcrypt from "bcryptjs"; // Import bcryptjs

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  handler: async ({ name, email, password }, { cookies }) => {
    try {
      // Generate a unique ID
      const userId = UUID();
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        id: userId,
        name: name,
        email: email,
        password: hashedPassword,
        role: "user", // Default role
        createdAt: new Date(), // Set creation date
      };

      // Insert the new user into the database
      await db.insert(User).values(newUser);

      return { ok: true, message: "User registered successfully" };
    } catch (error) {
      console.error("Error registering user:", error);
      // In a real application, you might want to check for specific errors
      // like unique constraint violations (e.g., email already exists)
      return { ok: false, message: "Failed to register user" };
    }
  },
});
