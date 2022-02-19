import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </PostProvider>
    </UserProvider>
  );
}

export default App;
