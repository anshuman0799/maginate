const ImageArea = () => {
  return (
    <div className="w-full lg:w-3/5 flex flex-col gap-5 md:gap-10 items-center  ">
      <div className="w-[350px] h-[350px] md:w-[650px] md:h-[650px] border-[1px] border-dashed border-yellow-500 rounded-3xl flex items-center justify-center">
        <p className="text-white/60 font-titleFont text-center">
          Write your prompt to generate your image...
        </p>
      </div>
    </div>
  );
};

export default ImageArea;
