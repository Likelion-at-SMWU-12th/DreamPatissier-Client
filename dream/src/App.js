import { Routes, Route } from "react-router-dom";
import "./index.css";
import Menubar from "./pages/Menubar";
import Bakery from "./pages/Bakery";
import Recipes from "./pages/Recipes";
import Diary from "./pages/Diary";
import Users from "./pages/Users";
import OrderList from "./pages/userpage/OrderList";
import Review from "./pages/userpage/Review";
import SavedRecipes from "./pages/userpage/SavedRecipes";
import TestBread from "./pages/userpage/TestBread";
import OfUse from "./pages/userpage/OfUse";

function App() {
  return (
    <>
      <Menubar />
      <Routes>
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/orders" element={<OrderList />} />
        <Route path="/users/reviews" element={<Review />} />
        <Route path="/users/saved-recipes" element={<SavedRecipes />} />
        <Route path="/test/result/{int:pk}" element={<TestBread />} />
        <Route path="/of-use" element={<OfUse />} />
        <Route path="/accounts/logout/" element={<TestBread />} />
      </Routes>
    </>
  );
}

export default App;
