import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import { DarkModeProvider } from './contexts/DarkModeContext';

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
  },
  {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
  },
  {
      path: "/profile",
      element: <Profile />,
      errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router}/>
    </DarkModeProvider>
  </React.StrictMode>
);
