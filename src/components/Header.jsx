import React from "react";
import one from "../images/CS.jpeg";

function Header() {
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
      </nav>
    </header>
  );
}

export default Header;
