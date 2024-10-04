"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [activeNav, setActiveNav] = useState("generate");
  const router = useRouter();

  const handleToggleNav = () => {
    const newNav = activeNav === "generate" ? "community" : "generate";
    setActiveNav(newNav);

    if (newNav === "generate") {
      router.push("/");
    } else if (newNav === "community") {
      router.push("/community-posts");
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
              Generate Art
            </button>
          ) : (
            <button className="nav-item" onClick={handleToggleNav}>
              Community Posts
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
