'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function QuizDetail() {
    const { id } = useParams();
    const router = useRouter();

    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('quizzes') || '[]');
        const selectedQuiz = data[Number(id)];
        if (selectedQuiz) {
            setQuiz(selectedQuiz);
            setAnswers(Array(selectedQuiz.questions.length).fill(-1))
        }
    }, [id]);

    function handleAnswerChange(qIdx, aIdx) {
        const copy = [...answers];
        copy[qIdx] = aIdx;
        setAnswers(copy);
    }

    function handleSubmit() {
        let correct = 0;
        answers.forEach((ans, i) => {
            if (ans === quiz.questions[i].answer) {
                ++correct;
            }
        })

        setScore(correct);
        setShowResult(true);
    }

    if (!quiz) return <p>Loading . . . </p>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
            {quiz.questions.map((q, i) => (
                <div key={i} className="mb-4">
                    <p className="font-semibold">{q.question}</p>
                    {q.options.map((opt, j) => {
                        const isSelected = answers[i] === j;
                        const isCorrect = q.answer === j;
                        const isWrongSelected = isSelected && !isCorrect;

                        let color = '';
                        if (showResult) {
                            if (isCorrect) color = 'text-green-600 font-bold';
                            if (isWrongSelected) color = 'text-red-600 line-through';
                        }

                        return (
                            <div key={j} className="flex items-center">
                                <input type="radio"
                                    name={`q-${i}`}
                                    checked={isSelected}
                                    onChange={() => handleAnswerChange(i, j)}
                                    className="mr-2"
                                    disabled={showResult}
                                />
                                <label className={color}>{opt}</label>
                            </div>
                        )
                    })}
                </div>
            ))}

            {
                !showResult ? (
                    <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded mt-4">
                        Finish Quiz
                    </button>
                )
                    :
                    (
                        <p className="text-xl font-bold text-blue-700 mt-4">
                            Result : {score}/{quiz.questions.length}
                        </p>
                    )
            }
        </div>
    )
}