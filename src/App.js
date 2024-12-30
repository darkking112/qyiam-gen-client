import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/admin"} element={<Admin />} />
          <Route path={"/teacher"} element={<Teacher />} />
          <Route path={"/student"} element={<Student />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
