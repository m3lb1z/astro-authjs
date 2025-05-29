# Astro AuthJS

This is a simple authjs project built with Astro.

## Getting Started

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd astro-authjs
    ```
2.  **Install dependencies:**
    Make sure you have pnpm installed.
    ```bash
    pnpm install
    ```
3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The site will be available at `http://localhost:4321`.

## Environment Variables

This project requires the following environment variables to be set:

- `AUTH_SECRET`: A secret key used by Auth.js for signing and encrypting tokens.
- `AUTH_TRUST_HOST`: Set to `true` in production environments where the app is hosted behind a proxy.
- `DATABASE_URL`: The connection string for your database (e.g., SQLite, PostgreSQL).

You can create a `.env` file in the root of the project to set these variables for local development.

## Dependencies

This project uses the following main dependencies installed via pnpm:

- `@astrojs/db`: Astro DB integration.
- `@astrojs/netlify`: Netlify adapter for server-side rendering.
- `auth-astro`: Astro integration for Auth.js.
- `bcryptjs`: For password hashing.
- `sweetalert2`: For beautiful alerts.
- `tailwindcss`: For CSS styling.
- `uuid`: For generating unique IDs.

Development dependencies include:

- `@types/bcryptjs`
- `@types/uuid`

## Deployment

Before deploying to production, follow these steps:

1.  **Push database schema:**
    Ensure your database schema is up-to-date by running the database push command.
    ```bash
    pnpm db:push
    ```
2.  **Build for production:**
    Generate the production build of the application.
    ```bash
    pnpm build:remote
    ```
    This command prepares the necessary files for deployment to your hosting provider (e.g., Netlify).
