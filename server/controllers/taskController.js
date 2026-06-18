const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task =
      await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  const tasks =
    await Task.find();

  res.json(tasks);
};


const updateTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const deleteTask = async (
  req,
  res
) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};