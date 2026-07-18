const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

// Get all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Add todo
app.post("/todos", (req, res) => {
    const todo = {
        id: Date.now(),
        task: req.body.task,
        completed: false
    };

    todos.push(todo);

    res.json(todo);
});

// Update todo
app.put("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    todos = todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );

    res.json({ message: "Updated" });
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    todos = todos.filter(todo => todo.id !== id);

    res.json({ message: "Deleted" });
});


app.listen(5000, () => {
    console.log("Backend running on port 5000");
});