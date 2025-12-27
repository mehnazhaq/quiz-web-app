import React, { useState } from "react";
import Navbar from "../Navbar";

function Mcq_multiple() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOptionIndexes: [],
    createdAt: new Date().toISOString(),
    status: "active",
  });

  const [questions, setQuestions] = useState([]);

  function addQuestion(e) {
    e.preventDefault();

    const filledOpt = currentQuestion.options.filter((o) => o.trim() !== "");
    if (
      currentQuestion.question.trim().length >= 10 &&
      filledOpt.length >= 2 &&
      currentQuestion.correctOptionIndexes.length >= 1
    ) {
      setQuestions([...questions, currentQuestion]);
    } else {
      alert("Please fill question, options & correct answers");
      return;
    }

    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndexes: [],
    });

    setNumber(number + 1);
  }

  function saveQuiz(e) {
    e.preventDefault();

    const filledOptions = currentQuestion.options.filter((o) => o.trim() !== "");
    let updatedQuestions = [...questions];

    if (
      currentQuestion.question.trim().length >= 10 &&
      filledOptions.length >= 2 &&
      currentQuestion.correctOptionIndexes.length >= 1
    ) {
      updatedQuestions.push(currentQuestion);
    }

    if (
      updatedQuestions.length < 2 ||
      title.trim().length < 5 ||
      description.trim().length < 10
    ) {
      alert("Minimum 2 valid questions required");
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
    if (!Array.isArray(existing)) existing = [];

    existing.push(quizData);
    localStorage.setItem("quizData", JSON.stringify(existing));
    alert("Quiz saved successfully!");

    setTitle("");
    setDescription("");
    setQuestions([]);
    setNumber(1);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndexes: [],
    });
  }

  function handleOptionChange(i, value) {
    const updated = [...currentQuestion.options];
    updated[i] = value;
    setCurrentQuestion({ ...currentQuestion, options: updated });
  }

  function removeOption(i) {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions.splice(i, 1);

    const updatedCorrectIndexes = currentQuestion.correctOptionIndexes
      .filter((index) => index !== i)
      .map((index) => (index > i ? index - 1 : index));

    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
      correctOptionIndexes: updatedCorrectIndexes,
    });
  }

  function toggleCorrectOptions(index) {
    const alreadySelected =
      currentQuestion.correctOptionIndexes.includes(index);

    const updated = alreadySelected
      ? currentQuestion.correctOptionIndexes.filter((i) => i !== index)
      : [...currentQuestion.correctOptionIndexes, index];

    setCurrentQuestion({
      ...currentQuestion,
      correctOptionIndexes: updated,
    });
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-black px-4 py-10">
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-6 md:p-10">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            MCQ – Multiple Correct Answers
          </h2>

          {/* Quiz Info */}
          <div className="bg-white/90 rounded-xl p-5 mb-8">
            <input
              type="text"
              value={title}
              placeholder="Quiz Title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 p-3 border rounded"
            />
            <textarea
              value={description}
              placeholder="Quiz Description"
              onChange={(e) => setDescription(e.target.value)}
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
              type="text"
              value={currentQuestion.question}
              placeholder="Enter question (min 10 characters)"
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  question: e.target.value,
                })
              }
              className="w-full p-3 border rounded mb-4"
            />

            {currentQuestion.options.map((option, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center gap-3 mb-3"
              >
                <input
                  type="text"
                  value={option}
                  placeholder={`Option ${i + 1}`}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="flex-1 p-2 border rounded"
                />

                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={currentQuestion.correctOptionIndexes.includes(i)}
                    onChange={() => toggleCorrectOptions(i)}
                  />
                  Correct
                </label>

                {currentQuestion.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
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

export default Mcq_multiple;
