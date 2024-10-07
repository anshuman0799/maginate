"use client";
import { FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

export const Footer = () => {
  const copyToClipboard = (event) => {
    event.preventDefault();
    const email = "anshuman0799@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast.success("Email copied successfully :)");
      })
      .catch(() => {
        toast.error("Failed to copy email.");
      });
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-gray-800 text-white w-full py-4 mt-auto">
      <Toaster />
      <h1 className="w-full text-center mt-5 font-titleFont font-semibold text-lg md:text-xl text-white/90">
        Say Hi to the developer :)
      </h1>
      <div className="flex mt-2 gap-0 justify-center translate-x-6">
        <a href="https://anshumanrao.vercel.app/" className="contactIcon">
          <FaGlobe />
        </a>
        <a
          href="https://www.linkedin.com/in/anshuman0799/"
          target="_blank"
          rel="noopener noreferrer"
          className="contactIcon"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/sh.human/"
          target="_blank"
          rel="noopener noreferrer"
          className="contactIcon"
        >
          <FaInstagram />
        </a>
        <a
          href="mailto:anshuman0799@gmail.com"
          onClick={copyToClipboard}
          className="contactIcon"
        >
          <IoMail />
        </a>
      </div>
      <h2 className="w-full text-center font-titleFont font-semibold text-lg md:text-xl text-white/90">
        Thanks for visiting!
      </h2>
      <h2 className="w-full text-center text-sm mb-5 text-white/90">
        © {new Date().getFullYear()} Anshuman. All Rights Reserved.
      </h2>
    </div>
  );
};
