const express = require('express');

const  serverless = require('serverless-http');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database" (array to store todos)
let todos = [
  { id: 1, task: 'Learn Node.js' },
  { id: 2, task: 'Build an app' }
];

// Route to get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Route to get a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json(todo);
});

// Route to create a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }
  
  const newTodo = {
    id: todos.length + 1,
    task
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route to update an existing todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  if (task) {
    todo.task = task;
  }

  res.json(todo);
});

// Route to delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



module.exports.handler = serverless(app);







// const main = serverless(app);

// // Export the handler function
// export const handler = async (
// 	event,
// 	context
//   ) => {
// 	try {
// 	  // Handle the request
// 	  const result = await main(event, context);
// 	  return result;
// 	} catch (error) {
// 	  console.error('Server error:', error);
// 	  return {
// 		statusCode: 500,
// 		body: JSON.stringify({
// 		  success: false,
// 		  data: null,
// 		  error: 'Internal Server Error'
// 		})
// 	  };
// 	}
//   };

