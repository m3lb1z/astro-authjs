import type { DefaultSession, DefaultUser } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    role?: string; // Optional role field
  }

  interface Session extends DefaultSession {
    user: User; // Ensure the user field is of type User
  }
}
