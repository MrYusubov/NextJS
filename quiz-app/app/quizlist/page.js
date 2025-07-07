'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

export default function QuizList() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('quizzes');
        if (data) setQuizzes(JSON.parse(data));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quiz List</h1>
            <Link href='/create' className="text-blue-600 underline">Create new quiz</Link>
            <ul className="mt-4 space-y-2">
                {
                    quizzes.map((q, i) => (
                        <li key={i}>
                            <Link href={`/quizlist/${i}`} className="block bg-white shadow p-4 rounded hover:bg-blue-600">
                                {q.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}