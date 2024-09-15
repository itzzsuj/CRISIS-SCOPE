// Header.js
import React, { useState } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Firestore utilities
import one from "../images/CS.jpeg"; // Company logo

function Header() {
  const [sending, setSending] = useState(false);

  // Function to send the SOS request to Firebase
  const sendSOS = async () => {
    if (navigator.geolocation) {
      setSending(true); // Start loading

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Add the lat and lon to Firestore
            await addDoc(collection(db, "SOSRequests"), {
              lat,
              lon,
              timestamp: new Date(),
            });

            alert("SOS sent successfully!");
          } catch (error) {
            console.error("Error sending SOS:", error);
            alert("Failed to send SOS.");
          }

          setSending(false); // Stop loading
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get location.");
          setSending(false); // Stop loading
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <header className="flex items-center justify-between w-full text-xl font-medium text-black bg-white shadow-lg fixed top-0 left-0 px-4 py-2 z-10">
      <div className="flex items-center">
        <img
          loading="lazy"
          src={one}
          alt="Company logo"
          className="object-contain w-40 max-w-full aspect-[3.5]"
        />
      </div>
      <nav className="flex items-center gap-4">
        <a href="#home" className="hover:underline">
          Home
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#services" className="hover:underline">
          Services
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
        <a href="login" className="px-4 py-1.5 whitespace-nowrap bg-yellow-400 rounded-full">
          Login
        </a>
        {/* SOS Button */}
        <button
          onClick={sendSOS}
          disabled={sending} // Disable button while sending
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: sending ? "not-allowed" : "pointer",
          }}
        >
          {sending ? "Sending SOS..." : "SOS"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
