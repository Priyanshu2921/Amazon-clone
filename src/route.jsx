import { Routes, Route } from "react-router-dom";
import { Carousel } from "./components/Carsoul/Carsoul";
import { MobileCarousel } from "./components/Carsoul/Mobile-carsoul";
import { DealsSection } from "./components/Sections/Dealsection";
import SignupForm from "./components/Sign-in_up_page/Sign-Up-Form";
import CartPage from "./components/Cart/cart-page";
import ProductList from "./components/Pages/ProductList";
import TodaysProduct from "./components/Pages/Todays-deal";
import ProductPage from "./components/Pages/ProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <>
            <Carousel />
            <MobileCarousel />
            <DealsSection />
            <ProductList />
          </>
        }
      />

      {/* Today's Deal Route */}
      <Route path="/todays-deal" element={<TodaysProduct />} />

      {/* Sign-Up Form Route */}
      <Route path="/Sign-Up-Form" element={<SignupForm />} />

      {/* Cart Page Route */}
      <Route path="/cart" element={<CartPage />} />

      {/* Individual Product Details Route */}
      <Route path="/product/:productId" element={<ProductPage />} />
    </Routes>
  );
};

export default AppRoutes;
