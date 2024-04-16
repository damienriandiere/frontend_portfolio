import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error-page.jsx";
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ProjectPage from './components/ProjectPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import Navbar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import RedirectAfterLogin from './components/RedirectAfterLogin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/projects",
    element: <ProjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/successful_logged",
    element: <RedirectAfterLogin />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);