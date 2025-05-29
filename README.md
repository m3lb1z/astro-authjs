# Astro Store

This is a simple e-commerce store project built with Astro.

## Getting Started

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd astro-store
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
