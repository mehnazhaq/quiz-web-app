import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function QuizGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("quizData");
    const allQuizzes = JSON.parse(raw) || [];

    const index = parseInt(id);
    if (allQuizzes[index]) {
      setQuizData(allQuizzes[index]);
    } else {
      navigate("/PlayQuiz");
    }
  }, [id, navigate]);

  const currentQ = quizData?.questions[currentQuestionIndex];

  /* ---------- SINGLE MCQ ---------- */
  function handleSingleMCQ(optionIndex) {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);
  }

  /* ---------- MULTIPLE MCQ ---------- */
  function handleMultipleMCQ(optionIndex) {
    const updated = [...selectedAnswers];
    const existing = updated[currentQuestionIndex] || [];

    if (existing.includes(optionIndex)) {
      updated[currentQuestionIndex] = existing.filter(i => i !== optionIndex);
    } else {
      updated[currentQuestionIndex] = [...existing, optionIndex];
    }

    setSelectedAnswers(updated);
  }

  /* ---------- SHORT ANSWER ---------- */
  function handleShortAnswer(value) {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = value;
    setSelectedAnswers(updated);
  }

  function handleNext() {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      localStorage.setItem("useranswers", JSON.stringify(selectedAnswers));
      localStorage.setItem("activequiz", JSON.stringify(quizData));
      navigate("/QuizResult");
    }
  }

  if (!quizData) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#A44200] text-white px-4 py-10 flex justify-center">
        <div className="bg-[#D58936] p-6 rounded-lg max-w-xl w-full space-y-5">

          <h2 className="text-2xl font-bold">
            Question {currentQuestionIndex + 1}
          </h2>

          <p className="text-lg">{currentQ.question}</p>

          {/* ✅ SINGLE MCQ */}
          {currentQ.correctOptionIndex !== undefined && (
            currentQ.options.map((opt, idx) => (
              <label key={idx} className="flex gap-2 items-center">
                <input
                  type="radio"
                  name={`q-${currentQuestionIndex}`}
                  checked={selectedAnswers[currentQuestionIndex] === idx}
                  onChange={() => handleSingleMCQ(idx)}
                />
                {opt}
              </label>
            ))
          )}

          {/* ✅ MULTIPLE MCQ */}
          {Array.isArray(currentQ.correctOptionIndexes) && (
            currentQ.options.map((opt, idx) => (
              <label key={idx} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={
                    selectedAnswers[currentQuestionIndex]?.includes(idx) || false
                  }
                  onChange={() => handleMultipleMCQ(idx)}
                />
                {opt}
              </label>
            ))
          )}

          {/* ✅ SHORT ANSWER */}
          {currentQ.answer && (
            <input
              type="text"
              placeholder="Type your answer"
              className="w-full p-2 rounded text-black"
              value={selectedAnswers[currentQuestionIndex] || ""}
              onChange={(e) => handleShortAnswer(e.target.value)}
            />
          )}

          <button
            className="bg-[#A44200] px-4 py-2 rounded hover:bg-[#7a2a00]"
            onClick={handleNext}
          >
            {currentQuestionIndex === quizData.questions.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizGame;
