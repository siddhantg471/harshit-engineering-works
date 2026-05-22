# Harshit Engineering Works

A modern web application for Harshit Engineering Works, providing premium rubber mixing solutions.

## Project Structure

This project has been refactored from a monolithic HTML file into a structured directory layout:

- `index.html`: The main HTML structure, clean and optimized.
- `css/`: Contains custom CSS styles.
- `js/`: Contains JavaScript logic.
  - `tailwind-config.js`: Tailwind CSS configuration and theming.
  - `firebase-app.js`: Firebase initialization, authentication, and database logic.
  - `main.js`: UI interactions, animations, and modals.
- `backend/`: Node.js Express backend.
  - `server.js`: Basic Express server to serve the frontend and handle potential APIs.
  - `package.json`: Project dependencies.

## Setup Instructions

### 1. Frontend Development (Static)
You can directly open `index.html` in a web browser to view the frontend. No local server is strictly required for the UI, but Firebase features (like authentication) might require it to be served over `http://` or `https://` instead of `file://` to prevent CORS issues.

### 2. Running with Node.js Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   *(Or use `npm start` for production mode)*

4. Open your browser and navigate to `http://localhost:3000`.

## Features
- **Modern UI**: Powered by Tailwind CSS.
- **Animations**: Custom keyframes for smooth, engaging interactions.
- **Firebase Integration**: 
  - User Authentication (Email/Password, Google, Facebook).
  - Firestore Database for tracking Contact Submissions and User Activities.
- **Responsive Design**: Works on Desktop, Tablet, and Mobile.
