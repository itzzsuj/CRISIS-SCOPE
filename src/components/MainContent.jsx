import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import NewsUpdateSection from "./NewsUpdateSection";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function MainContent() {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <main className="bg-white">
      {/* Wrapper for all sections except footer, keeping the padding */}
      <div className="flex overflow-hidden flex-col px-20 pt-20 pb-80 max-md:px-5 max-md:pb-24">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <NewsUpdateSection />
        
        {/* Add a Login button */}
        <button onClick={handleLoginClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div>

      {/* Footer with no padding or margin, full-width */}
      <Footer />
    </main>
  );
}

export default MainContent;
