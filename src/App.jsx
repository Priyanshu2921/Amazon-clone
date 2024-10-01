import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AmazonHeader } from "./header";
import { Navbar } from "./amazon-nav-bar";
import { Carousel } from "./Carsoul";
import { MobileCarousel } from "./Mobile-carsoul";
import { DesktopHeader } from "./Desktop-header";
import { MobileSearchBar } from "./header";
import { DealsSection } from "./Dealsection";
import SignupForm from "./Sign-Up-Form";
import './index.css';

function Layout({ children }) {
  const location = useLocation();

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
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <MobileCarousel />
                <DealsSection />
              </>
            }
          />
          <Route path="/Sign-Up-Form" element={<SignupForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}
