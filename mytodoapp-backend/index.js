const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let todos = [];
let currentId = 1;

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// GET /todos - fetch all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos - add a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  const newTodo = { id: currentId++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE /todos/:id - delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
