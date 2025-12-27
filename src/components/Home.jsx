import frame1 from "../assets/Frame2.jpg";
import frame2 from "../assets/Frame3.jpg";
import frameImg from "../assets/frame4.jpg";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4 py-10">

        {/* Heading */}
        <div className="text-center mt-20 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Welcome to Quiz Web App 🎯
          </h1>
          <p className="text-gray-300 text-lg">
            Create, manage & play quizzes easily
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10">

          {/* My Quizzes */}
          <Link to="/MyQuizes" className="group relative">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:scale-105">
              <img
                src={frame1}
                alt="My Quizzes"
                className="w-72 h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <h2 className="text-white text-2xl font-semibold">
                  My Quizzes
                </h2>
              </div>
            </div>
          </Link>

          {/* Create Quiz */}
          <Link to="/create-quiz" className="group relative">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:scale-105">
              <img
                src={frame2}
                alt="Create Quiz"
                className="w-72 h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <h2 className="text-white text-2xl font-semibold">
                  Create Quiz
                </h2>
              </div>
            </div>
          </Link>

          {/* Play Quiz */}
          <Link to="/PlayQuiz" className="group relative">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:scale-105">
              <img
                src={frameImg}
                alt="Play Quiz"
                className="w-72 h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <h2 className="text-white text-2xl font-semibold">
                  Play Quiz
                </h2>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
}

export default Home;
