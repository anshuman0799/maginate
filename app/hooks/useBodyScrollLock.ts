// useBodyScrollLock.ts
import { useEffect } from "react";

const useBodyScrollLock = () => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
};

export default useBodyScrollLock;
