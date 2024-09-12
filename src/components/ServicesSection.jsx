
import React from "react";
import ServiceCard from "./ServiceCard";

function ServicesSection() {
  const services = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/67465ea771ef5f971abf910c645593b831fecb69e379d008b382ec212df200e5?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      title: "Real-Time Casualty Tracking",
      description:
        "We provide real-time tracking and estimation of casualties and injured individuals using data from emergency services, hospitals, and on-ground rescue teams.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/100d2ba9ba447c025e23cfb5686dbb0181f63adacedf670dc5b2c9cf98047ff5?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      title: "Resource Estimation & Supply Forecasting",
      description:
        "We estimate the resources needed for rescue efforts, including teams, medical aid, shelters, and essential supplies, while forecasting demand for food, water, and other necessities.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/67465ea771ef5f971abf910c645593b831fecb69e379d008b382ec212df200e5?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      title: "Web Development",
      description:
        "We enable users to share their real-time GPS location and use geofencing to provide guidance to safe zones or nearby rescue shelters.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/01549a26939ce0e107765b448fe78cac1c784c91841523a63f2fee91b58a4b9d?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      title: "Coordination with Relief Organizations",
      description:
        "We streamline coordination with local authorities, NGOs, and volunteers to ensure aid is delivered efficiently where it's needed most.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ba7847b09fdc468357770877c927d29c251d76432047cbffe8a7bacd3875409?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      title: "Detailed Mapping",
      description:
        "We offer detailed mapping of disaster zones by combining satellite imagery, drones, and crowdsourced data to provide real-time visualizations of impacted areas.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f2f5a00c4808efefc21ff90d67b399fb83c315f5dcf5a49a14342d08c17f296f?placeholderIfAbsent=true&apiKey=32ea7a6332e74b77babd6d1104c25fd5",
      title: "Crowdsourcing for Incident Reporting",
      description:
        "Users can report accidents, disasters, request medical aid, or essential supplies, and even report missing persons through our crowdsourcing feature.",
    },
  ];

  return (
    <section id="services" className="mt-44 max-md:mt-10">
      <h2 className="self-start ml-11 text-5xl font-bold text-black max-md:ml-2.5 max-md:text-4xl">
        Our Services
      </h2>
      <p className="self-start mt-6 ml-11 text-2xl font-semibold leading-none text-black max-md:max-w-full">
        The entire cycle of digital transformation effortlessly handled for you.
      </p>
      <div className="mt-24 ml-14 w-full max-w-[1326px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
