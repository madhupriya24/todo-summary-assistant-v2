import './App.css';
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [summary, setSummary] = useState("");
  const [slackStatus, setSlackStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo.trim(), done: false }]);
    setNewTodo("");
  };

  // Delete todo
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Toggle done status
  const toggleDone = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
  };

  // Summarize todos and send to Slack
  const handleSummarize = async () => {
    if (todos.length === 0) {
      setSummary("Please add some todos first.");
      return;
    }

    setLoading(true);
    setSlackStatus("");
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todos: todos.map(todo => ({ text: todo.text }))
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary || "No summary returned");
        setSlackStatus("✅ Summary sent to Slack successfully!");
      } else {
        setSummary("Error fetching summary");
        setSlackStatus("❌ Failed to send summary to Slack.");
      }
    } catch (error) {
      console.error("Summarization error:", error);
      setSummary("Error fetching summary");
      setSlackStatus("❌ Network or server error.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="Add new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>

     <ul style={{ paddingLeft: 0, maxWidth: "500px" }}>
  {todos.map((todo, idx) => (
    <li
      key={idx}
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleDone(idx)}
          style={{ marginRight: "10px" }}
        />
        <span
          style={{
            textDecoration: todo.done ? "line-through" : "none",
            wordBreak: "break-word"
          }}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(idx)}
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>



      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize Todos"}
      </button>

      {summary && (
        <div style={{ marginTop: 20 }}>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      {slackStatus && (
        <div style={{ marginTop: 10, color: slackStatus.includes("✅") ? "green" : "red" }}>
          {slackStatus}
        </div>
      )}
    </div>
  );
}

export default App;
