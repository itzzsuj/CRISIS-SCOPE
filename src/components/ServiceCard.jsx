
import React from "react";

function ServiceCard({ icon, title, description }) {
  return (
    <div className="flex flex-col w-[33%] max-md:w-full">
      <div className="flex flex-col grow items-start text-black max-md:mt-10">
        <img
          loading="lazy"
          src={icon}
          alt={title}
          className="object-contain rounded-none aspect-square w-[51px]"
        />
        <h3 className="mt-7 text-xl font-bold">{title}</h3>
        <p className="self-stretch mt-2.5 text-base leading-6">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
