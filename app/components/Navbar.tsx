"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="navContainer">
      <div className="logoImage">
        <Image src={"/icons/logo.png"} width={200} height={250} alt="logo" />
      </div>

      <div className="navbar">
        <nav>
          {activeNav === "generate" ? (
            <button className="navItem" onClick={handleToggleNav}>
              <FaCompass />
              <span>Explore</span>
            </button>
          ) : (
            <button className="navItem" onClick={handleToggleNav}>
              <FaMagic />
              <span>Generate</span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
