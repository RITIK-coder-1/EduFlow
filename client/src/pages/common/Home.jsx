/* ----------------------------------------------------------------------------------------------
Home.jsx
The landing page of the application 
------------------------------------------------------------------------------------------------- */

import { useGetAllTheCoursesQuery } from "@/api/index.api";
import { CommonButton, CourseCard } from "@/components/index.components";
import filterCourses from "@/utils/filterCourses";
import { Link } from "react-router-dom";

function Home() {
  // the local component for recurring elements
  const Section = ({ children, className }) => (
    <section
      className={`w-full flex flex-col justify-center items-center gap-4 mt-5 p-2 ${className}`}
    >
      {children}
    </section>
  );
  const Span = ({ children, className }) => (
    <span
      className={`text-center text-xs text-white/80 md:text-sm ${className}`}
    >
      {children}
    </span>
  );
  const SecondHeading = ({ children, className }) => (
    <h2 className={`text-center font-bold sm:text-lg md:text-xl ${className}`}>
      {children}
    </h2>
  );

  // the brand partners
  const brands = [
    "Microsoft Logo.png",
    "Facebook Logo.png",
    "Samsung Logo.png",
    "Walmart Logo.png",
  ];

  // the courses to display
  const { data } = useGetAllTheCoursesQuery();
  const courses = data?.data.slice(0, 4); // only 4 courses
  const filteredCourses = filterCourses(courses); // filter the data to showcase

  return (
    <>
      {/* The header */}
      <header className="w-full border-b pb-2 px-3 border-white/10">
        <nav className="w-full flex justify-between">
          <div className="flex justify-start" title="EduFlow">
            <div className="flex items-center justify-center w-auto gap-1 font-bold md:text-lg md:gap-2">
              {/* The logo */}
              <img
                src="LMS.png"
                alt="the logo"
                className="w-7 h-7 rounded-full md:w-10 md:h-10"
              />
              <span>EduFlow</span>
            </div>
          </div>
          {/* Account links */}
          <div className="flex justify-center items-center gap-6">
            <Link
              className="text-md cursor-pointer hover:text-slate-400 md:text-xl"
              title="Log in"
              to="/login"
            >
              Login
            </Link>
            <Link className="hidden sm:inline" to="/register" title="Register">
              <CommonButton
                label="Create Account"
                className="w-auto text-sm rounded-full px-7 py-4 shadow-none md:text-lg md:py-5 md:px-8"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* The hero section */}
      <Section>
        <h1 className="text-center text-4xl text-white font-bold md:text-5xl">
          Empowering Education <br /> Through{" "}
          <span className="text-blue-400">Seamless Technology.</span>
        </h1>
        <Span>
          Experience a high-performance LMS <br /> featuring secure
          authentication, RBAC, and intuitive course management. <br /> Built
          for the modern learner.
        </Span>
        {/* The brand partners */}
        <div className="w-full flex flex-col justify-center items-center mt-16 gap-3">
          <SecondHeading className="text-white/50">
            {" "}
            Trusted By Learners From
          </SecondHeading>
          <div className="w-full flex flex-wrap justify-center items-start gap-3 sm:gap-7 lg:gap-20">
            {brands.map((brand) => (
              <img src={brand} className="w-23 sm:w-28 md:w-36" />
            ))}
          </div>
        </div>
      </Section>

      {/* The courses section */}
      <Section>
        <SecondHeading className="text-white">
          {" "}
          Learn From The Best
        </SecondHeading>
        <Span>Discover our top-rated courses across various categories.</Span>
        <div className="w-full flex flex-col gap-6 px-7 my-5 justify-center items-center sm:flex-row">
          {filteredCourses?.map((course) => (
            <CourseCard
              image={course?.img}
              title={course?.title}
              instructor={`${course?.instructorFirstName} ${course?.instructorLastName}`}
              description={course?.desc}
              price={course?.price}
              path={`/app/courses/${course?.courseId}`}
            />
          ))}
        </div>
        <Link to="/app/courses">
          <CommonButton
            label="Show all courses"
            className="bg-transparent border-white/90"
          />
        </Link>
      </Section>
    </>
  );
}

export default Home;

// /////////
