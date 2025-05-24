import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);     // List of todos
  const [todoInput, setTodoInput] = useState(''); // Current input

  // Add todo handler
  const addTodo = () => {
    if (todoInput.trim() === '') return;  // Ignore empty

    setTodos([...todos, todoInput.trim()]);  // Add new todo
    setTodoInput(''); // Clear input
  };

  return (
    <div style={{ margin: 20 }}>
      <h1>My Todo List</h1>

      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
  {todos.map((todo, index) => (
    <li key={index}>
      {todo} 
      <button onClick={() => {
        // Remove todo at this index
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      }}>Remove</button>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
