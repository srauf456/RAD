import { useDashboardContext } from "../context/DashboardContext";
//import { useState } from "react";
function Settings(){
    const { theme, toggleTheme, language, changeLanguage } = useDashboardContext();
    return  (
    <div>
        <h1>Settings</h1>
              <form className="space-y-4 mt-4 flex flex-col justify-center">
        {/* Theme toggle */}
        <div className="flex items-center gap-8">
          <label className="font-semibold">Theme</label>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-4 py-2 text-black rounded"
          >
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>

        {/* Language selection */}
        <div className="flex items-center gap-8">
          <label className="font-semibold">Language</label>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="en">English</option>
            <option value="es">Arabic</option>
            {/* Add more options as needed */}
          </select>
        </div>

      </form>
        </div>
    )
}
export default Settings;