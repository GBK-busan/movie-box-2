import Sun from "../../assets/Sun.svg?react";
import Moon from "../../assets/Moon.svg?react";

import "./DarkMode.css";

const DarkMode = () => {
  const setDarkTheme = () =>
    document.querySelector("body").setAttribute("data-theme", "dark");
  const setLightTheme = () =>
    document.querySelector("body").setAttribute("data-theme", "light");
  const toggleTheme = (e) =>
    e.target.checked ? setDarkTheme() : setLightTheme();

  setLightTheme(); //처음 시작시 라이트테마로 시작
  return (
    <div className="dark_mode">
      <input
        onChange={toggleTheme}
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Moon />
        <Sun />
      </label>
    </div>
  );
};

export default DarkMode;
