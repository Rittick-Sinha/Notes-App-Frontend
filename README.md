# Note App (Frontend)

A modern note-taking web application built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui.

## Features
- User authentication (register & login)
- Create, read, update, and delete (CRUD) notes
- Responsive, clean UI
- Toast notifications for actions
- Secure API integration with backend

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup
1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>/client
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the `client` directory:
     ```env
     VITE_API_URL=http://localhost:3001/api
     ```
   - Set the value to your backend API URL.
4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal).

## Project Structure
- `src/components/` – UI components (Dashboard, AuthPage, NoteCard, NoteForm, etc.)
- `src/lib/api.ts` – API calls to the backend
- `src/pages/` – Page-level components
- `src/hooks/` – Custom React hooks

## Technologies Used
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Deployment
You can deploy this app to any static hosting provider (Vercel, Netlify, etc.).
- Build the app:
  ```sh
  npm run build
  # or
  yarn build
  ```
- Deploy the contents of the `dist` folder.
- Set the `VITE_API_URL` environment variable to your deployed backend API URL.

## License
MIT
