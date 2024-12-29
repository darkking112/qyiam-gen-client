import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
