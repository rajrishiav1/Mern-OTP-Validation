import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Otp from "./page/Otp";
import Headers from "./components/Headers";
import Error from "./page/Error";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Headers />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="*" element={<Error />} />
      </Routes>
      
    </>
  );
}

export default App;
