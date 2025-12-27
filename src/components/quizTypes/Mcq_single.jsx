import { useState } from "react";
import Navbar from "../Navbar";

function Mcq_single() {
  const [number, setNumber] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOptionIndex: null,
    createdAt: new Date().toISOString(),
    status: "active",
  });

  const [questions, setQuestions] = useState([]);

  function addQuestion(e) {
    e.preventDefault();

    const filledOpts = currentQuestion.options.filter((o) => o.trim() !== "");
    if (
      currentQuestion.question.trim().length < 10 ||
      filledOpts.length < 2 ||
      currentQuestion.correctOptionIndex === null
    ) {
      alert("Please fill all details correctly");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: null,
    });
    setNumber(number + 1);
  }

  function handleOptions(index, value) {
    const updated = [...currentQuestion.options];
    updated[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updated });
  }

  function saveQuiz(e) {
    e.preventDefault();

    if (title.trim().length < 5 || description.trim().length < 10) {
      alert("Please enter valid title & description");
      return;
    }

    let updatedQuestions = [...questions];

    if (
      currentQuestion.question.trim() !== "" &&
      currentQuestion.options.some((o) => o.trim() !== "") &&
      currentQuestion.correctOptionIndex !== null
    ) {
      updatedQuestions.push(currentQuestion);
    }

    if (updatedQuestions.length < 1) {
      alert("Add at least one question");
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
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: null,
    });
    setNumber(1);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-black px-4 py-10">
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-6 md:p-10">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            MCQ – Single Correct Answer
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

          {/* Question */}
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

            {currentQuestion.options.map((option, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center gap-3 mb-3"
              >
                <input
                  value={option}
                  onChange={(e) => handleOptions(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="flex-1 p-2 border rounded"
                />

                {currentQuestion.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newOptions = [...currentQuestion.options];
                      newOptions.splice(i, 1);
                      setCurrentQuestion({
                        ...currentQuestion,
                        options: newOptions,
                      });
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    ❌
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: [...currentQuestion.options, ""],
                    })
                  }
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  ➕
                </button>
              </div>
            ))}

            {/* Correct Option */}
            <select
              className="w-full p-3 border rounded mt-4"
              value={currentQuestion.correctOptionIndex ?? ""}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  correctOptionIndex: parseInt(e.target.value),
                })
              }
            >
              <option value="">Select Correct Option</option>
              {currentQuestion.options.map((_, i) => (
                <option key={i} value={i}>
                  Option {i + 1}
                </option>
              ))}
            </select>
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

export default Mcq_single;
