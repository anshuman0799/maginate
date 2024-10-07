import React from "react";

const GenerateForm = () => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-3 lgl:gap-8">
        <h1 className="text-3xl md:text-3xl font-titleFont text-center leading-6">
          Craft Stunning Visuals from Your Imagination
        </h1>
        <h1 className="text-3xl md:text-3xl font-titleFont text-center leading-6">
          with
          <span className="text-designColor font-bold capitalize">
            {" "}
            Artificial Intelligence{" "}
          </span>
          .
        </h1>
        <p className="text-sm md:text-lg text-center font-bodyFont text-white/90 leading-6 tracking-wide py-5">
          Guide the Magic: Write Your Prompt for the Image You Want
        </p>
      </div>
    </div>
  );
};

export default GenerateForm;
