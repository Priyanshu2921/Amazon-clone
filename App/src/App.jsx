// src/App.jsx
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AmazonHeader } from "./components/Header/header";
import { Navbar } from "./components/Header/amazon-nav-bar";
import { DesktopHeader } from "./components/Header/Desktop-header";
import { MobileSearchBar } from "./components/Header/header";
import AppRoutes from "./route"; 
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
        <AppRoutes /> 
      </Layout>
    </Router>
  );
}
