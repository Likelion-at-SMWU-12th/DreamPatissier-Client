import { Routes, Route } from "react-router-dom";
import Menubar from "./pages/Menubar";
import Bakery from "./pages/Bakery";
import Recipes from "./pages/Recipes";
import Diary from "./pages/Diary";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <Menubar />
      <Routes>
        <Route path="/Bakery" element={<Bakery />} />
        <Route path="/Recipes" element={<Recipes />} />
        <Route path="/Diary" element={<Diary />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
