# health-server

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Express, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Express** - Fast, unopinionated web framework
- **Node.js** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **SQLite/Turso** - Database engine
- **Authentication** - Better-Auth

## Getting Started

First, install the dependencies:

```bash
npm install
```
## Database Setup

This project uses SQLite with Drizzle ORM.

1. Start the local SQLite database:
```bash
cd packages/db && npm run db:local
```


2. Update your `.env` file in the `apps/server` directory with the appropriate connection details if needed.

3. Apply the schema to your database:
```bash
npm run db:push
```


Then, run the development server:

```bash
npm run dev
```

The API is running at [http://localhost:3000](http://localhost:3000).







## Project Structure

```
server/
├── apps/
│   └── server/      # Backend API (Express)
├── packages/
│   ├── api/         # API layer / business logic
│   ├── auth/        # Authentication configuration & logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps
- `npm run db:push`: Push schema changes to database
- `npm run db:studio`: Open database studio UI
- `cd packages/db && npm run db:local`: Start the local SQLite database
