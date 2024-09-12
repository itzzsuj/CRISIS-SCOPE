import React from "react";
import one from "../images/logo2.png"

const Footer = () => {
  return (
    <div id="contact" className="bg-yellow-400 w-full py-8">
      <div className="flex flex-col md:flex-row justify-between items-start max-w-7xl mx-auto px-6 space-y-6 md:space-y-0 md:space-x-6">
        {/* First Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-bold text-lg">About Crisis Scope</h2>
          <p>About Us</p>
          <p>Press</p>
          <p>Resources and Policies</p>
          <p>Careers</p>
          <p>Rescue Team</p>
          <p>Trust & Safety</p>
          <p>Contact Us</p>
          <p>Accessibility Statement</p>
        </div>

        {/* Second Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-bold text-lg">Contact Us</h2>
          <p>9878674939</p>
          <p>SRMIST,KTR</p>
          <p>tg5678@srmist.edu.in</p>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex flex-col items-center mt-8 space-y-4">
        <img
          src={one}
          alt="Tripadvisor Logo"
          className="w-40 h-auto"
        />
        <h1 className="font-bold text-xl">Crisis Scope</h1>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-sm">
        <p>&copy; Crisis Scope, Inc.</p>
      </div>
    </div>
  );
};

export default Footer;
