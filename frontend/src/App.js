import { useEffect } from "react";
import "./App.css";
import { getPosts } from "./AppFunctions";

function App() {
  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    async function getTodaysPosts() {
      const data = await getPosts(date);
      console.log(data);
    }
    getTodaysPosts();
  }, []);

  return (
    <div>
      <h1>Memeger</h1>
    </div>
  );
}

export default App;
