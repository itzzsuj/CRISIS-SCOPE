import React from "react";
import one from "../images/CS.jpeg";
import foodRequestImage from "../images/foodRequests.jpeg";
import aidRequestImage from "../images/aidRequests.jpeg";
import rescueImage from "../images/rescue.jpeg";
import uploadImage from "../images/upload.jpeg";

function UserDashboard() {  // <--- Use capital U and D
  return (
    <>
      {/* Header Section */}
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
          <a href="logout" className="px-4 py-1.5 whitespace-nowrap bg-yellow-400 rounded-full">
            Logout
          </a>
        </nav>
      </header>

      {/* Main Content Section */}
      <section className="self-center mt-32 ml-4 w-full max-w-[1683px] max-md:mt-10 max-md:max-w-full">
        {/* Food Request Section */}
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start self-stretch my-auto text-black max-md:mt-10 max-md:max-w-full">
              <h2 className="ml-3 text-5xl font-bold max-md:ml-2.5 max-md:text-4xl">
                Food Requests
              </h2>
              <p className="self-stretch mt-12 text-2xl leading-9 max-md:mt-10 max-md:max-w-full">
                In the aftermath of a crisis, access to food can become critical. Our
                Food Requests section allows individuals and organizations in affected
                regions to request food supplies. Whether you're seeking food for a
                family, shelter, or community, this platform connects you to the right
                resources to fulfill your immediate nutritional needs.
              </p>
              <button className="px-10 pt-3 pb-6 mt-36 ml-3 text-base font-medium text-center bg-yellow-400 rounded-[40px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
                Request Food
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={foodRequestImage}
              alt="Food request illustration"
              className="object-contain grow w-full aspect-[1.04] max-md:mt-10 max-md:max-w-full rounded-full"
            />
          </div>
        </div>

        {/* Aid Request Section */}
        <div className="flex gap-5 mt-32 max-md:flex-col max-md:mt-10">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start self-stretch my-auto text-black max-md:mt-10 max-md:max-w-full">
              <h2 className="ml-3 text-5xl font-bold max-md:ml-2.5 max-md:text-4xl">
                Aid Request
              </h2>
              <p className="self-stretch mt-12 text-2xl leading-9 max-md:mt-10 max-md:max-w-full">
                Need medical supplies, hygiene kits, or shelter materials? Our Aid
                Request section is dedicated to connecting individuals and communities
                with the necessary assistance during a post-crisis situation. Submit
                your request for aid and get help from local and international relief
                organizations.
              </p>
              <button className="px-10 pt-3 pb-6 mt-36 ml-3 text-base font-medium text-center bg-yellow-400 rounded-[40px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
                Request Aid
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={aidRequestImage}
              alt="Aid request illustration"
              className="object-contain grow w-full aspect-[1.04] max-md:mt-10 max-md:max-w-full rounded-full"
            />
          </div>
        </div>

        {/* Rescue Section */}
        <div className="flex gap-5 mt-32 max-md:flex-col max-md:mt-10">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start self-stretch my-auto text-black max-md:mt-10 max-md:max-w-full">
              <h2 className="ml-3 text-5xl font-bold max-md:ml-2.5 max-md:text-4xl">
                Rescue
              </h2>
              <p className="self-stretch mt-12 text-2xl leading-9 max-md:mt-10 max-md:max-w-full">
                If you or someone you know is in immediate danger, missing, or trapped
                due to flooding, landslides, or any other crisis, use our Rescue
                Request feature. We coordinate with emergency services and local
                rescue teams to ensure rapid response and assistance.
              </p>
              <button className="px-10 pt-3 pb-6 mt-36 ml-3 text-base font-medium text-center bg-yellow-400 rounded-[40px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
                Request Rescue
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={rescueImage}
              alt="Rescue request illustration"
              className="object-contain grow w-full aspect-[1.04] max-md:mt-10 max-md:max-w-full rounded-full"
            />
          </div>
        </div>

        {/* Upload Photo/Video Section */}
        <div className="flex gap-5 mt-32 max-md:flex-col max-md:mt-10">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start self-stretch my-auto text-black max-md:mt-10 max-md:max-w-full">
              <h2 className="ml-3 text-5xl font-bold max-md:ml-2.5 max-md:text-4xl">
                Upload Photo/Video
              </h2>
              <p className="self-stretch mt-12 text-2xl leading-9 max-md:mt-10 max-md:max-w-full">
                Help with crowdsourcing information by uploading photos and videos
                of the crisis in your area. Your media could assist rescue teams,
                volunteers, and authorities in understanding the situation on the
                ground and determining how best to respond.
              </p>
              <button className="px-10 pt-3 pb-6 mt-36 ml-3 text-base font-medium text-center bg-yellow-400 rounded-[40px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
                Upload Photo/Video
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={uploadImage}
              alt="Upload media illustration"
              className="object-contain grow w-full aspect-[1.04] max-md:mt-10 max-md:max-w-full rounded-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default UserDashboard; // Correct the export name here too
