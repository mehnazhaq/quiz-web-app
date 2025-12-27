import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function CreateNewQuiz() {
  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="w-full min-h-screen bg-gradient-to-br from-rose-950 via-red-900 to-black flex items-center justify-center px-4 py-10">

        {/* Card */}
        <div className="w-full max-w-5xl backdrop-blur-lg bg-white/20 rounded-2xl p-8 md:p-12 shadow-2xl">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3">
            Select Question Type ✍️
          </h2>
          <p className="text-center text-gray-200 mb-10">
            Choose how you want to create your quiz questions
          </p>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* MCQ Single */}
            <Link to="/create-quiz/Mcq_single" className="group">
              <div className="bg-white/80 rounded-xl p-6 text-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="text-4xl mb-3">🅰️</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  MCQ (Single Answer)
                </h3>
                <p className="text-gray-600 text-sm">
                  Only one correct option
                </p>
              </div>
            </Link>

            {/* MCQ Multiple */}
            <Link to="/create-quiz/Mcq_multiple" className="group">
              <div className="bg-white/80 rounded-xl p-6 text-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="text-4xl mb-3">🔢</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  MCQ (Multiple Answers)
                </h3>
                <p className="text-gray-600 text-sm">
                  More than one correct option
                </p>
              </div>
            </Link>
          </div>

          {/* Short Answer */}
          <Link to="/create-quiz/Short_answer" className="group">
            <div className="flex justify-center">
              <div className="bg-white/80 rounded-xl p-6 text-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl w-full md:w-2/3">
                <div className="text-4xl mb-3">✏️</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Short Answer
                </h3>
                <p className="text-gray-600 text-sm">
                  Answer in 1–2 words
                </p>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
}

export default CreateNewQuiz;
