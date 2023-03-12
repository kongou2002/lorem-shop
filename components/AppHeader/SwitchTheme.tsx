"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const SwitchTheme = () => {
  //we store the theme in localStorage to preserve the state on next visit with an initial theme of dark.
  const [theme, setTheme] = useState("");
  //toggles the theme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localTheme = localStorage.getItem("theme");
      console.log(localTheme);
      if (localTheme) {
        setTheme(localTheme);
      }
    } else {
      console.log("server");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dracula" ? "cupcake" : "dracula");
  };

  //modify data-theme attribute on document.body when theme changes
  useEffect(() => {
    const body = document.getElementById("theme") as HTMLElement;
    body.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    } else {
      console.log("server");
    }
  }, [theme]);

  return (
    <button className="btn btn-circle" onClick={toggleTheme}>
      {theme === "dark" ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </button>
  );
};

export default SwitchTheme;
