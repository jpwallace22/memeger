import "./App.css";
import { Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
