import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import EditForm from "./Pages/EditForm";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className='' style={{ padding: "5rem", width: "50%", margin: "0 auto" }}>
      <Toaster position='top-center' reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/edit-form' element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
