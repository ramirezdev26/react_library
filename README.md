# Book Dashboard

A single-page application for searching and borrowing books, built with React and TypeScript.

## Live Demo

[https://react-library-eta.vercel.app](https://react-library-eta.vercel.app)

## Description

Book Dashboard lets users search for books using the Open Library API, view book details, and manage a personal loan list. Users can borrow and return books, with their loan history persisted per account using Firebase Firestore.

## Technologies

- React 19 + TypeScript
- Vite
- Redux Toolkit — global state management (theme, authentication)
- React Router v7 — client-side routing
- Firebase Authentication — user login
- Firebase Firestore — loan persistence per user
- Vitest + React Testing Library — unit testing
- Open Library API — book data

## Installation

```bash
git clone https://github.com/ramirezdev26/react-library.git
cd react-library
npm install
```

Create a `.env` file in the root with your Firebase credentials:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Running Tests

```bash
npm test
```