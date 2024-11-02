"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaCompass, FaMagic } from "react-icons/fa";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isGeneratePage = pathname === "/";

  const handleToggleNav = () => {
    if (isGeneratePage) {
      router.push("/explore");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="navContainer">
      <div className="logoImage">
        <Image src={"/icons/logo.png"} width={200} height={250} alt="logo" />
      </div>

      <div className="navbar">
        <nav>
          <button className="navItem" onClick={handleToggleNav}>
            {isGeneratePage ? <FaCompass /> : <FaMagic />}
            <span>{isGeneratePage ? "Explore" : "Generate"}</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
