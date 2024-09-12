import React from "react";
import two from "../images/Hero.jpeg";

function HeroSection() {
  return (
    <section id="home" className="flex flex-col items-center justify-center mt-44 w-full max-w-[1633px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col items-center justify-center w-full">
        <div className="flex flex-col w-[62%] max-md:w-full max-md:items-center max-md:text-center">
          <h1 className="text-6xl font-extrabold text-black max-md:text-4xl">
            "Crisis Scope: Empowering Relief, Saving Lives in Real-Time"
          </h1>
        </div>
        <div className="flex flex-col w-[38%] max-md:w-full max-md:mt-4">
          <img
            loading="lazy"
            src={two}
            alt="Crisis Scope illustration"
            className="w-full h-auto rounded-full"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
