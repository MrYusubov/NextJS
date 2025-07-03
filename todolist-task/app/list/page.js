'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (title.trim() === '' || description.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setDescription('');
  };

  const toggleTodo = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const goToDescription = (id) => {
    router.push(`/list/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todolist</h1>

      <ul style={{ padding: 0, listStyle: 'none' }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => goToDescription(todo.id)}
            style={{
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: todo.completed ? 'lightgreen' : 'lightcoral',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onClick={(e) => e.stopPropagation()}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '30px' }}>
        <h3>Yeni Todo əlavə et</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}
