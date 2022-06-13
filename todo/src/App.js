// import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Home } from "./components/Home";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Routes>
        <Route exact path="/" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
