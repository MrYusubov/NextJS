'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CreateQuiz() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', ''], answer: 0 }]);
    const router = useRouter();

    function handleAddQuestion() {
        setQuestions([...questions, { question: '', options: ['', '', ''], answer: 0 }])
    }

    function handleChange(qIdx, key, value) {
        const copy = [...questions];
        copy[qIdx][key] = value;
        setQuestions(copy);
    }

    function handleOptionChange(qIdx, oIdx, value) {
        const copy = [...questions];
        copy[qIdx].options[oIdx] = value;
        setQuestions(copy);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem('quizzes') || '[]');
        localStorage.setItem('quizzes', JSON.stringify([...existing, { title, questions }]));
        router.push('/quizlist');
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input placeholder="Quiz name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-blue-400 p-2 w-full"
            />
            {
                questions.map((q, i) => (
                    <div key={i} className="border border-blue-400 p-4 rounded">
                        <input
                            placeholder="Question"
                            value={q.question}
                            onChange={(e) => handleChange(i, 'question', e.target.value)}
                            className="border border-blue-400 p-2 w-full mb-2"
                        />
                        {
                            q.options.map((opt, j) => (
                                <div key={j} className="flex items-center mb-1">
                                    <input
                                        type="radio"
                                        name={`correct-${i}`}
                                        checked={q.answer === j}
                                        onChange={() => handleChange(i, 'answer', j)}
                                    />
                                    <input
                                        value={opt}
                                        onChange={(e) => handleOptionChange(i, j, e.target.value)}
                                        placeholder={`Variant ${j + 1}`}
                                        className="border border-blue-400 p-2 w-full ml-2"
                                    />
                                </div>
                            ))
                        }
                    </div>
                ))
            }

            <button type="button" onClick={handleAddQuestion}
                className="bg-blue-400 px-4 py-2 rounded mr-2"
            >
                Add new question
            </button>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Create Quiz
            </button>
        </form>
    )
}