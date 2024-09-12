
import React from "react";
import news from "../images/news.jpeg"

function NewsUpdateSection() {
  return (
    <section className="self-center mt-32 ml-4 w-full max-w-[1683px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start self-stretch my-auto text-black max-md:mt-10 max-md:max-w-full">
            <h2 className="ml-3 text-5xl font-bold max-md:ml-2.5 max-md:text-4xl">
              News Update
            </h2>
            <p className="self-stretch mt-12 text-2xl leading-9 max-md:mt-10 max-md:max-w-full">
              Stay informed with the latest updates on ongoing rescue
              operations, disaster alerts, and relief efforts across affected
              regions. Our News Update section provides real-time information on
              crisis developments, government advisories, and critical
              announcements from emergency services. Follow key updates from
              volunteers, on-ground rescue teams, and local authorities as they
              respond to incidents, ensuring that you are always aware of the
              situation as it unfolds. Whether it's updates on resource
              availability, new rescue missions, or important safety
              instructions, our goal is to keep you connected and informed
              during emergencies.
            </p>
            <button className="px-10 pt-3 pb-6 mt-36 ml-3 text-base font-medium text-center bg-yellow-400 rounded-[40px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
              Know More
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src={news}
            alt="News update illustration"
            className="object-contain grow w-full aspect-[1.04] max-md:mt-10 max-md:max-w-full rounded-full"
          />
        </div>
      </div>
    </section>
  );
}

export default NewsUpdateSection;
