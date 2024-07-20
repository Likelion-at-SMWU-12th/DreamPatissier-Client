import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Menubar from "./pages/Menubar";
import Bakery from "./pages/Bakery";
import Recipes from "./pages/Recipes";
import Diary from "./pages/Diary";
import Users from "./pages/Users";
import OrderList from "./pages/userpage/OrderList";
import Review from "./pages/userpage/Review";
import WriteReview from "./pages/review/WriteReview";
import SavedRecipes from "./pages/userpage/SavedRecipes";
import TestBread from "./pages/userpage/TestBread";
import OfUse from "./pages/userpage/OfUse";
import Detail from "./pages/Detail";
import Signup from "./pages/accounts/Signup";
import Login from "./pages/accounts/Login";

import profile from "./assets/logo.png";

function App() {
  const location = useLocation();
  const hideMenubar =
    location.pathname === "/accounts/login/" ||
    location.pathname === "/accounts/signup/";

  return (
    <>
      {!hideMenubar && <Menubar />}
      <Routes>
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/orders" element={<OrderList />} />
        <Route path="/users/reviews" element={<Review />} />
        <Route path="/users/reviews/:id" element={<WriteReview />} />
        <Route path="/users/saved-recipes" element={<SavedRecipes />} />
        <Route path="/test/result/{int:pk}" element={<TestBread />} />
        <Route path="/of-use" element={<OfUse />} />
        <Route path="/accounts/signup/" element={<Signup />} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/accounts/logout/" element={<TestBread />} />
      </Routes>
    </>
  );
}

export default App;
