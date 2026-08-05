/* ---------------------------------------------------------------------------------------
MainSection.tsx
The main section of the app that containst the main body content of each page 
------------------------------------------------------------------------------------------ */

import { ReactNode } from "react";

interface MainSectionProps {
  children: ReactNode;
}

function MainSection({ children }: MainSectionProps) {
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center gap-5 pt-3 relative">
      {children}
    </main>
  );
}

export default MainSection;
