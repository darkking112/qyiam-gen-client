import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/admin"} element={<Admin />} />
          <Route path={"/teacher"} element={<Teacher />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
