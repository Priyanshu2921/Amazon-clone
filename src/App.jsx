import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AmazonHeader } from "./header";
import { Navbar } from "./amazon-nav-bar";
import { Carousel } from "./Carsoul";
import { MobileCarousel } from "./Mobile-carsoul";
import { DesktopHeader } from "./Desktop-header";
import { MobileSearchBar } from "./header";
import { DealsSection } from "./Dealsection";
import SignupForm from "./Sign-Up-Form";
import CartPage from './cart-page'; 
import ProductList from "./ProductList";
import TodaysProduct from "./Todays-deal"; 

import ProductPage from './ProductPage'; 
import './index.css';

function Layout({ children }) {
  const location = useLocation();

  // Hide Header and Navbar for specific routes like Sign-Up Form
  const hideHeaderAndNavbar = location.pathname === '/Sign-Up-Form';

  return (
    <>
      {!hideHeaderAndNavbar && (
        <>
          <DesktopHeader />
          <Navbar />
          <AmazonHeader />
          <MobileSearchBar />
        </>
      )}
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
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
            
               {/* Displaying Product List */}
              </>
            }
          />
          {/* Today's Deal Route */}
          <Route
            path="/todays-deal"
            element={<TodaysProduct />}
          />

          {/* Sign-Up Form Route */}
          <Route path="/Sign-Up-Form" element={<SignupForm />} />

          {/* Cart Page Route */}
          <Route path="/cart" element={<CartPage />} />

          {/* Individual Product Details Route */}
          <Route path="/product/:productId" element={<ProductPage />} /> {/* Product Page */}
        </Routes>
      </Layout>
    </Router>
  );
}
