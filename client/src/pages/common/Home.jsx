/* ----------------------------------------------------------------------------------------------
Home.jsx
The landing page of the application 
------------------------------------------------------------------------------------------------- */

import { CommonButton } from "@/components/index.components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* The header */}
      <header className="w-full border-b pb-2 px-3 border-white/10">
        <nav className="w-full flex justify-between">
          <div className="flex justify-start" title="EduFlow">
            <div className="flex items-center justify-center w-auto gap-1 font-bold md:text-lg md:gap-2">
              <img
                src="LMS.png"
                alt="the logo"
                className="w-7 h-7 rounded-full md:w-10 md:h-10"
              />
              <span>EduFlow</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            <Link className="text-md text-foreground cursor-pointer hover:text-slate-400 md:text-xl" title="Log in" to="/login">Login</Link>
            <Link className="hidden sm:inline" to="/register" title="Register">
              <CommonButton label="Create Account" className="w-auto text-sm rounded-full px-7 py-4 shadow-none md:text-lg md:py-5 md:px-8"/>
            </Link>
          </div>
        </nav>
      </header>
      <section className="w-full"></section>
    </>
  );
}

export default Home;
