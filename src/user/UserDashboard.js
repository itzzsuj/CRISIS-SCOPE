import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import one from "../images/CS.jpeg";
import foodRequestImage from "../images/foodRequests.jpeg";
import aidRequestImage from "../images/aidRequests.jpeg";
import rescueImage from "../images/rescue.jpeg";
import uploadImage from "../images/upload.jpeg";

function UserDashboard() {
  const navigate = useNavigate();

  // References for scrolling
  const foodRef = useRef(null);
  const aidRef = useRef(null);
  const rescueRef = useRef(null);
  const uploadRef = useRef(null);

  // Scroll to the section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Handle Logout and navigate to MainContent
  const handleLogout = () => {
    // Perform any necessary cleanup
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Header Section */}
      <header className="flex items-center justify-between w-full text-xl font-medium text-black bg-white shadow-lg fixed top-0 left-0 px-6 py-4 z-10">
        <div className="flex items-center">
          <img
            loading="lazy"
            src={one}
            alt="Company logo"
            className="object-contain w-36 max-w-full"
          />
        </div>
        <nav className="flex items-center gap-6">
          <button onClick={() => scrollToSection(foodRef)} className="hover:underline">
            Food
          </button>
          <button onClick={() => scrollToSection(aidRef)} className="hover:underline">
            Aid
          </button>
          <button onClick={() => scrollToSection(rescueRef)} className="hover:underline">
            Rescue
          </button>
          <button onClick={() => scrollToSection(uploadRef)} className="hover:underline">
            Upload
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-yellow-400 rounded-full text-white font-medium"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content Section */}
      <section className="mt-32 px-6 mx-auto max-w-screen-xl">
        {/* Food Request Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-32" ref={foodRef}>
          <div className="flex flex-col lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Food Requests</h2>
            <p className="text-lg leading-7 mb-6">
              In the aftermath of a crisis, access to food can become critical. Our Food Requests section allows individuals and organizations in affected regions to request food supplies.
            </p>
            <button
              onClick={() => navigate("/FoodRequest")}
              className="px-8 py-3 bg-yellow-400 text-white font-medium rounded-lg"
            >
              Request Food
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              loading="lazy"
              src={foodRequestImage}
              alt="Food request illustration"
              className="object-cover w-64 h-64 rounded-full"
            />
          </div>
        </div>

        {/* Aid Request Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-32" ref={aidRef}>
          <div className="flex flex-col lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Aid Request</h2>
            <p className="text-lg leading-7 mb-6">
              Need medical supplies, hygiene kits, or shelter materials? Our Aid Request section is dedicated to connecting individuals and communities with assistance.
            </p>
            <button
              onClick={() => navigate("/AidRequest")}
              className="px-8 py-3 bg-yellow-400 text-white font-medium rounded-lg"
            >
              Request Aid
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              loading="lazy"
              src={aidRequestImage}
              alt="Aid request illustration"
              className="object-cover w-64 h-64 rounded-full"
            />
          </div>
        </div>

        {/* Rescue Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-32" ref={rescueRef}>
          <div className="flex flex-col lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Rescue</h2>
            <p className="text-lg leading-7 mb-6">
              If you or someone you know is in immediate danger, missing, or trapped due to a crisis, use our Rescue Request feature.
            </p>
            <button
              onClick={() => navigate("/RescueRequest")}
              className="px-8 py-3 bg-yellow-400 text-white font-medium rounded-lg"
            >
              Request Rescue
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              loading="lazy"
              src={rescueImage}
              alt="Rescue request illustration"
              className="object-cover w-64 h-64 rounded-full"
            />
          </div>
        </div>

        {/* Upload Photo/Video Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-32" ref={uploadRef}>
          <div className="flex flex-col lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Upload Photo/Video</h2>
            <p className="text-lg leading-7 mb-6">
              Help rescue teams by uploading photos and videos of the crisis in your area.
            </p>
            <button
              onClick={() => navigate("/UploadMedia")}
              className="px-8 py-3 bg-yellow-400 text-white font-medium rounded-lg"
            >
              Upload Media
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              loading="lazy"
              src={uploadImage}
              alt="Upload media illustration"
              className="object-cover w-64 h-64 rounded-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default UserDashboard;
