'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DescriptionPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      const list = JSON.parse(stored);
      const found = list.find(item => item.id === Number(id));
      setTodo(found);
    }
  }, [id]);

  if (!todo) return <div style={{ padding: '20px' }}>Yüklənir...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <button onClick={() => router.back()}>← Geri</button>
    </div>
  );
}
