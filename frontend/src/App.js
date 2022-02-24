import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MakePost from "./pages/MakePost";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-post" element={<MakePost />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
        <Footer />
      </PostProvider>
    </UserProvider>
  );
}

export default App;
