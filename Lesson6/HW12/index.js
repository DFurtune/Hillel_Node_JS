const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, "data", "tasks.json");

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

const readTasks = async () => {
  try {
    const data = await fs.promises.readFile(TASKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.writeFile(
        TASKS_FILE,
        JSON.stringify([], null, 2),
        "utf-8"
      );
      return [];
    }
    throw error;
  }
};

const writeTasks = async (tasks) => {
  try {
    await fs.promises.writeFile(
      TASKS_FILE,
      JSON.stringify(tasks, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing tasks to file:", error);
    throw error;
  }
};

const validateTask = (task) => {
  const errors = [];
  if (!task.title || task.title.length < 3) {
    errors.push("Title is required and must be at least 3 characters long.");
  }
  if (!["todo", "in-progress", "done"].includes(task.status)) {
    errors.push("Status must be one of: todo, in-progress, done.");
  }
  return errors;
};

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await readTasks();
    const { status } = req.query;
    if (status) {
      const filteredTasks = tasks.filter((task) => task.status === status);
      return res.json(filteredTasks);
    }
    res.json(tasks);
  } catch (error) {
    console.error("Error reading tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tasks/sorted", async (req, res) => {
  try {
    const tasks = await readTasks();
    const { by } = req.query;
    if (by === "created_at") {
      tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    res.json(tasks);
  } catch (error) {
    console.error("Error reading tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error reading tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const tasks = await readTasks();
    const newTask = req.body;

    const errors = validateTask(newTask);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    newTask.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    newTask.created_at = new Date().toISOString();

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/tasks/:id/status", async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const { status } = req.body;
    if (!["todo", "in-progress", "done"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    task.status = status;
    await writeTasks(tasks);

    res.json(task);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = req.body;
    const errors = validateTask(updatedTask);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    updatedTask.id = tasks[taskIndex].id;
    updatedTask.created_at = tasks[taskIndex].created_at;

    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
