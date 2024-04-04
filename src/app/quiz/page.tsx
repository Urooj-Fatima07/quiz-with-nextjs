'use client'
import React, { useState } from 'react'
import { quiz } from '../data'

const page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (answer, idx) => {
    setChecked(true)
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log('true');
    } else {
      setSelectedAnswer(false);
    }
  }

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer ? {
        ...prev,
        score: prev.score + 1,
        correctAnswers: prev.correctAnswers + 1,
      } : {
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className='container my-24 bg-white text-black mx-auto w-1/3 p-8'>
      <div>
        <h1 className="text-xl font-bold">
          Quiz Page
        </h1>
        <h2 className="text-lg font-semibold">
          Question: {activeQuestion + 1}/{questions.length}
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className='container'>
            <h3 className="text-xl font-normal">
              {questions[activeQuestion].question}
            </h3>
            {answers.map((answer, idx) => (
              <ul>
                <li
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={`list-none my-2 px-2 py-4 border border-gray-950 ${selectedAnswerIndex === idx
                      ? 'bg-blue-950 text-white hover:bg-blue-900'
                      : 'bg-gray-50 hover:bg-blue-900 hover:text-white'
                    }`}
                  key={idx}
                >
                  <span>{answer}</span>
                </li>

              </ul>
            ))}
            {checked ? (
              <button onClick={nextQuestion}
              className="border border-black font-bold text-xl px-4 py-2 text-center w-full bg-gray-400">
              {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}</button>
            ) : (
              <button
              className="border font-bold text-xl border-black text-center w-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2" disabled>
              Next</button>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-normal">
              Results
            </h3>
            <h3 className="text-xl font-normal pb-6">
              Overall:  {(result.score / 5) * 100} %
            </h3>
            <h3 className="text-xl font-normal">
              Details
            </h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button className="border border-black px-4 py-2 text-center w-full bg-gray-50" onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
