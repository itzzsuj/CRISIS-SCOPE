import React from "react";

function AboutSection() {
  return (
    <section id="about" className="self-center mt-44 ml-6 w-full max-w-[1665px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/102558da2277f135bb37cebb50050f5d9f8a2d1585edf153311e73f6cc668abf?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5"
            alt="Team of experts"
            className="object-contain grow w-full aspect-[0.75] rounded-[48px] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-2xl font-semibold text-black max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col max-w-full rounded-[90px] w-[276px]">
              <div className="px-5 py-3 bg-yellow-400 rounded-[90px] mt-20">
                We are expert team
              </div>
            </div>
            <h2 className="mt-7 text-5xl font-bold max-md:text-4xl">
              Who are we?
            </h2>
            <p className="mt-7 max-md:max-w-full">
              For tracking casualties, coordinating resources, and facilitating
              efficient rescue efforts.
            </p>
            <p className="mt-7 leading-10 text-stone-700 max-md:max-w-full">
              At Crisis Scope, we provide real-time disaster response and
              resource management through advanced casualty tracking, population
              density analysis, and detailed mapping of affected areas. By
              leveraging data from emergency services, satellite imagery, and
              public reports, we ensure efficient coordination with relief
              organizations, supply forecasting, and volunteer mobilization. Our
              platform enables location tracking, crowdsourcing of incident
              reports, and offline data synchronization, ensuring critical
              information flows seamlessly during disasters to support timely
              and effective rescue operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
