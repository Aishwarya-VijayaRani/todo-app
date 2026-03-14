const express = require("express");
const server = express();
require("dotenv").config();

server.use(express.json());
server.get("/", (req, res) => {
    res.send("Welcome to Todo API Server");
});

let nishuTasks = [
    {
        id: 1,
        name: "Nishu learning Express API",
        done: false
    },
    {
        id: 2,
        name: "John building Todo project",
        done: true
    }
];

// Get all tasks
server.get("/api/tasks", (req, res) => {
    res.status(200).json(nishuTasks);
});

// Add new task
server.post("/api/tasks", (req, res) => {

    if(!req.body.name){
        return res.status(400).json({message:"Task name is required"});
    }

    const newTask = {
        id: Date.now(),
        name: req.body.name,
        done: false
    };

    nishuTasks.push(newTask);

    res.status(201).json(newTask);
});

// Get task by ID
server.get("/api/tasks/:id", (req, res) => {

    const singleTask = nishuTasks.find(
        item => item.id === parseInt(req.params.id)
    );

    if (!singleTask) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(singleTask);
});

// Update task
server.put("/api/tasks/:id", (req, res) => {

    const taskUpdate = nishuTasks.find(
        item => item.id === parseInt(req.params.id)
    );

    if (!taskUpdate) {
        return res.status(404).json({ message: "Task not found" });
    }

    taskUpdate.name = req.body.name;
    taskUpdate.done = req.body.done;

    res.json(taskUpdate);
});

// Delete task
server.delete("/api/tasks/:id", (req, res) => {

    const position = nishuTasks.findIndex(
        item => item.id === parseInt(req.params.id)
    );

    if (position === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    nishuTasks.splice(position, 1);

    res.json({ message: "Task removed successfully" });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`todo-app API running on http://localhost:${PORT}`);
});
// testing change