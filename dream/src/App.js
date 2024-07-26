import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Menubar from "./pages/Menubar";
import Bakery from "./pages/Bakery";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/recipes/RecipeDetail";
import EditRecipe from "./pages/recipes/EditRecipe";
import WriteRecipe from "./pages/recipes/WriteRecipe";
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
import SignClear from "./pages/accounts/SignClear";
import CategoryPage from "./pages/CategoryPage";
import Logout from "./pages/userpage/Logout";
import SearchPage from "./pages/SearchPage";

import profile from "./assets/logo.png";

function App() {
  const location = useLocation();
  const hideMenubar =
    location.pathname === "/accounts/login/" ||
    location.pathname === "/accounts/signup/" ||
    location.pathname === "/accounts/signup-clear" ||
    location.pathname === "/of-use";

  return (
    <>
      {!hideMenubar && <Menubar />}
      <Routes>
        <Route path="/bakery" element={<Bakery />}>
          <Route path="/bakery/:categoryName/" element={<CategoryPage />} />
          <Route path="/bakery/search/:tags" element={<SearchPage />} />
        </Route>
        <Route path="/bakery/product/:id" element={<Detail />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
        <Route path="/recipes/write" element={<WriteRecipe />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/orders" element={<OrderList />} />
        <Route path="/users/reviews" element={<Review />} />
        <Route path="/users/reviews/:id" element={<WriteReview />} />
        <Route path="/users/saved-recipes" element={<SavedRecipes />} />
        <Route path="/test/result/{int:pk}" element={<TestBread />} />
        <Route path="/of-use" element={<OfUse />} />
        <Route path="/accounts/signup/" element={<Signup />} />
        <Route path="/accounts/signup-clear" element={<SignClear />} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/accounts/logout/" element={<Logout />} />
        <Route path="/test/*" element={<TestBread />} />
      </Routes>
    </>
  );
}

export default App;
