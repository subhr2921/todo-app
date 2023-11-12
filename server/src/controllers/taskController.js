const { Task } = require("../models");
const commonResponse = require("../helpers/commonResponse");
let _ENV = process.env;

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    let taskId = req.body?.taskId || null;
    if (taskId !== null) {
      const task = await Task.findById(taskId);
      if (!task) return commonResponse(res, 400, [], "Task Not Found");

      task.title = title;
      task.description = description;
      await task.save();
      return commonResponse(res, 200, [], "Task Updated Successfully");
    }
    let createdTask = await Task.create({
      title,
      description,
      user: req.user,
    });
    return commonResponse(res, 200, createdTask, "Task Added Successfully");
  } catch (error) {
    return commonResponse(res, 500, [], error.message);
  }
};

const getTask = async (req, res) => {
  try {
    const userId = req.user._id;

    const userTasks = await Task.find({ user: userId });
    return commonResponse(res, 200, userTasks);
  } catch (error) {
    return commonResponse(res, 500, [], error.message);
  }
};

const markComplete = async (req, res) => {
  try {
    const { _id, isDone } = req.body;
    const task = await Task.findById(_id);
    if (!task) return commonResponse(res, 400, [], "Task Not Found");
    if (task.isDone)
      return commonResponse(res, 400, [], "Task Already Completed");

    task.isDone = isDone;
    let updated = await task.save();
    return commonResponse(res, 200, updated, "Task Got Updated Successfully");
  } catch (error) {
    return commonResponse(res, 500, [], error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return commonResponse(res, 400, [], "Task Not Found");

    await task.deleteOne();

    return commonResponse(res, 200, [], "Task Got Deleted");
  } catch (error) {
    return commonResponse(res, 500, [], error.message);
  }
};

module.exports = {
  deleteTask,
  markComplete,
  createTask,
  getTask,
};
