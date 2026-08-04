/* ----------------------------------------------------------------------------------------------
VideoError.tsx
The page to display if the server was unable to return a video information
------------------------------------------------------------------------------------------------- */

import { Link } from "react-router-dom";

export default function VideoError({ courseId }: { courseId: string }) {
  return (
    <div className="h-auto bg-[#0a0a0c] text-white font-sans rounded-lg w-[90%] shadow-black mb-5 shadow-2xl lg:w-[80%] mx-auto">
      {/* Header/Navigation Bar */}
      <nav className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to={`/app/courses/${courseId}`}
            className="text-purple-500 hover:underline text-sm"
          >
            ← Back to Course
          </Link>
        </div>
      </nav>

      {/* Static Message Area */}
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <h2 className="text-xl font-semibold tracking-wide text-gray-200 mb-2">
          There was a problem
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          There was an error while deriving the video details.
        </p>
        <button className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all tracking-widest uppercase shadow-[0_0_20px_rgba(147,51,234,0.2)]">
          Try Again
        </button>
      </div>
    </div>
  );
}
