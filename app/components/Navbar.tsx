"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Import the icons from react-icons
import { FaCompass, FaMagic } from "react-icons/fa";

export const Navbar = () => {
  const [activeNav, setActiveNav] = useState("generate");
  const router = useRouter();

  const handleToggleNav = () => {
    const newNav = activeNav === "generate" ? "explore" : "generate";
    setActiveNav(newNav);

    if (newNav === "generate") {
      router.push("/");
    } else if (newNav === "explore") {
      router.push("/explore");
    }
  };

  return (
    <div className="flex size-full bg-gray-800">
      <div className="pt-8 md:pt-10 px-4 md:px-6">
        <Image src={"/icons/logo.png"} width={200} height={250} alt="logo" />
      </div>

      <div className="flex justify-end items-center size-full p-7 lg:px-40">
        <nav>
          {activeNav === "generate" ? (
            <button className="nav-item" onClick={handleToggleNav}>
              <FaCompass />
              <span>Explore</span>
            </button>
          ) : (
            <button className="nav-item" onClick={handleToggleNav}>
              <FaMagic />
              <span>Generate</span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
