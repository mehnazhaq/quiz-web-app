import Navbar from "../Navbar";
import React, { useState } from "react";

function Short_answer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
    createdAt: new Date().toISOString(),
    status: "active",
  });

  const [questions, setQuestions] = useState([]);

  function addQuestion(e) {
    e.preventDefault();

    const q = currentQuestion.question.trim();
    const a = currentQuestion.answer.trim();

    if (q.length < 10 || a.length === 0 || a.length > 20) {
      alert("Question must be ≥10 chars & answer 1–20 chars");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ question: "", answer: "" });
    setNumber(number + 1);
  }

  function saveQuiz(e) {
    e.preventDefault();

    if (title.trim().length < 5 || description.trim().length < 10) {
      alert("Enter valid title & description");
      return;
    }

    let updatedQuestions = [...questions];

    if (
      currentQuestion.question.trim().length >= 10 &&
      currentQuestion.answer.trim().length > 0 &&
      currentQuestion.answer.trim().length <= 20
    ) {
      updatedQuestions.push(currentQuestion);
    }

    if (updatedQuestions.length < 1) {
      alert("Add at least one valid question");
      return;
    }

    const quizData = {
      title,
      description,
      questions: updatedQuestions,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    let existing = JSON.parse(localStorage.getItem("quizData")) || [];
    existing.push(quizData);
    localStorage.setItem("quizData", JSON.stringify(existing));

    alert("Quiz saved successfully!");

    setTitle("");
    setDescription("");
    setQuestions([]);
    setCurrentQuestion({ question: "", answer: "" });
    setNumber(1);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-black px-4 py-10">
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-6 md:p-10">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Short Answer Questions
          </h2>

          {/* Quiz Info */}
          <div className="bg-white/90 rounded-xl p-5 mb-8">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quiz Title"
              className="w-full p-3 mb-3 border rounded"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Quiz Description"
              className="w-full p-3 border rounded"
              rows={4}
            />
          </div>

          {/* Question Builder */}
          <div className="bg-white/90 rounded-xl p-5 mb-6">
            <label className="font-semibold block mb-2">
              Question {number}
            </label>

            <input
              value={currentQuestion.question}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  question: e.target.value,
                })
              }
              placeholder="Enter question (min 10 characters)"
              className="w-full p-3 border rounded mb-4"
            />

            <input
              value={currentQuestion.answer}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  answer: e.target.value,
                })
              }
              placeholder="Enter answer (1–2 words)"
              className="w-full p-3 border rounded"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={addQuestion}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              ➕ Add Question
            </button>

            <button
              onClick={saveQuiz}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg"
            >
              💾 Save Quiz
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Short_answer;
