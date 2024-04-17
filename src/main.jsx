import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import HomePage from './routes/HomePage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import ProjectPage from './routes/ProjectPage.jsx';
import ContactPage from './routes/ContactPage.jsx';
import Navbar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import RedirectAfterLoginPage from './routes/RedirectAfterLoginPage.jsx';
import RedirectAfterRegisterPage from './routes/RedirectAfterRegisterPage.jsx';
import ProjectDetailsPage from './routes/ProjectDetailsPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    element: <RedirectAfterLoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/successful_registered",
    element: <RedirectAfterRegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectDetailsPage />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);