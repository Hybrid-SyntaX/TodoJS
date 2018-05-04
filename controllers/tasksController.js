const mongoose = require("mongoose");
var express = require("express");
const TodoTask = mongoose.model("todoTasks");

const readAll = (req, res) => {
  TodoTask.find((err, todoTasks) => {
    err ? res.send(err) : res.send(todoTasks);
  });
};
const create = (req, res) => {
  const { name, dueDate } = req.body;

  const todoTask = new TodoTask({
    name,
    dueDate,
    completionDate: null,
    creationDate: Date.now(),
    lastUpdated: Date.now()
  });

  todoTask.save(err => {
    err ? res.send(err) : res.send(todoTask);
  });
};
const read = (req, res) => {
  TodoTask.findById(
    req.params.id,
    (err, todoTask) => (err ? res.send(err) : res.json(todoTask))
  );
};
const update = (req, res) => {
  const { name, dueDate } = req.body;

  TodoTask.findById(req.params.id, (err, todoTask) => {
    if (err) res.send(err);

    //set info
    todoTask.name = name;
    todoTask.dueDate = dueDate;
    todoTask.lastUpdated = Date.now();

    todoTask.save(function(err) {
      if (err) res.send(err);

      res.json(todoTask);
    });
  });
};
const remove = (req, res) => {
  TodoTask.remove(
    {
      _id: req.params.id
    },
    (err, todoTask) => {
      if (err) res.json(err);

      res.json({ message: "Successfully deleted" });
    }
  );
};

const toggleTaskCompletion = (req, res, completeTask = true) => {
  TodoTask.findById(req.params.id, (err, todoTask) => {
    if (err) res.send(err);

    todoTask.completionDate = completeTask ? Date.now() : null;
    todoTask.lastUpdated = Date.now();

    todoTask.save(function(err) {
      if (err) res.send(err);

      res.json(todoTask);
    });
  });
};

module.exports = app => {
  app.post("/api/tasks", create);
  app.get("/api/tasks", readAll);
  app.get("/api/tasks/:id", read);
  app.put("/api/tasks/:id", update);
  app.delete("/api/tasks/:id", remove);
  app.patch("/api/tasks/:id/done", (req, res) =>
    toggleTaskCompletion(req, res, true)
  );
  app.patch("/api/tasks/:id/undone", (req, res) =>
    toggleTaskCompletion(req, res, false)
  );
};
