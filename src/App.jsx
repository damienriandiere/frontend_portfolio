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
import Error from "./components/Error";
import PrivateRoutes from "./components/PrivateRoutes";

export default function App() {
  const url_backend = import.meta.env.VITE_URL_BACKEND;
  localStorage.setItem("url_backend", url_backend);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes/>} >
          <Route element={<Dashboard/>} path='/dashboard' exact/>
          <Route element={<ProjectForm/>} path='/new-project' exact/>
          <Route element={<ProjectForm/>} path='/edit-project/:projectId' exact/>
        </Route>
        
        <Route element={<Home/>} path='/' exact/>
        <Route element={<Login/>} path='/login' exact/>
        <Route element={<Register/>} path='/register' exact/>
        <Route element={<Contact/>} path='/contact' exact/>
        <Route element={<Projects/>} path='/projects' exact/>
        <Route element={<ProjectDetails/>} path='/projects/:projectId' exact/>
        <Route element={<Error/>} path='*' exact/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}