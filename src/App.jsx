import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/ProjectForm";
import PrivateRoutes from "./components/PrivateRoutes";
import Error from "./components/Error";

export default function App() {
  const url_backend = import.meta.env.VITE_URL_BACKEND;
  localStorage.setItem("url_backend", url_backend);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />} errorElement={<Error />}>
          <Route element={<Dashboard />} path="/dashboard" exact />
          <Route element={<ProjectForm />} path="/new-project" exact />
          <Route
            element={<ProjectForm />}
            path="/edit-project/:projectId"
            exact
          />
        </Route>

        <Route element={<Home />} path="/" exact errorElement={<Error />} />
        <Route
          element={<Login />}
          path="/login"
          exact
          errorElement={<Error />}
        />
        <Route
          element={<Register />}
          path="/register"
          exact
          errorElement={<Error />}
        />
        <Route
          element={<Contact />}
          path="/contact"
          exact
          errorElement={<Error />}
        />
        <Route
          element={<Projects />}
          path="/projects"
          exact
          errorElement={<Error />}
        />
        <Route
          element={<ProjectDetails />}
          path="/projects/:projectId"
          exact
          errorElement={<Error />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
