import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function QuizResult() {
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("activequiz");
    const answers = localStorage.getItem("useranswers");

    if (!data || !answers) {
      navigate("/");
      return;
    }

    const parsedData = JSON.parse(data);
    const parsedAnswers = JSON.parse(answers);

    setQuizData(parsedData);
    setUserAnswers(parsedAnswers);

    let tempScore = 0;

    parsedData.questions.forEach((question, index) => {
      const userAnswer = parsedAnswers[index];

      // ✅ MCQ Single Correct
      if (
        typeof question.correctOptionIndex === "number" &&
        question.correctOptionIndex === userAnswer
      ) {
        tempScore++;
      }

      // ✅ MCQ Multiple Correct
      else if (
        Array.isArray(question.correctOptionIndexes) &&
        Array.isArray(userAnswer) &&
        JSON.stringify([...question.correctOptionIndexes].sort()) ===
          JSON.stringify([...userAnswer].sort())
      ) {
        tempScore++;
      }

      // ✅ Short Answer
      else if (
        typeof question.answer === "string" &&
        typeof userAnswer === "string" &&
        question.answer.trim().toLowerCase() ===
          userAnswer.trim().toLowerCase()
      ) {
        tempScore++;
      }
    });

    setScore(tempScore);
  }, [navigate]);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-[#3C1518] flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#3C1518] text-white p-8 flex flex-col items-center justify-center">
        <div className="bg-[#D58936] w-full max-w-xl rounded-xl shadow-xl flex flex-col items-center justify-center text-black p-6 space-y-4 mb-10">
          <div className="text-4xl font-extrabold">🎉 Congratulations!</div>

          <div className="text-xl font-semibold">
            You secured{" "}
            <span className="text-white bg-[#A44200] px-3 py-1 rounded">
              {score}
            </span>{" "}
            out of{" "}
            <span className="text-white bg-[#A44200] px-3 py-1 rounded">
              {quizData.questions.length}
            </span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-[#A44200] text-white px-6 py-2 rounded hover:bg-[#7a3200] transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizResult;
