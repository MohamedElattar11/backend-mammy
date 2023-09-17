const todo = require("../Models/todoSchema");

exports.addTask = (req, res) => {
  const { title, body, User } = req.body;
  const task = new todo({ title, body, User });
  console.log(task);
  task
    .save()
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => res.send(err));
};

exports.getAllTasks = async (req, res) => {
  const id = req.params.id;
  const tasks = await todo.find({ User: id }).populate("User");
  res.status(200).send(tasks);
};

exports.getTaskById = async (req, res) => {
  const task = await todo.findById(req.params.id);
  res.status(200).send(task);
};

exports.editTask = async (req, res) => {
  const task = await todo.findByIdAndUpdate(req.params.id,{status: req.body.status});
  console.log(task)
  res.status(201).json(task);
};

exports.delTask = async (req, res) => {
  const task = await todo.findByIdAndDelete(req.params.id);
  res.status(200).json("Task deleted");
};
