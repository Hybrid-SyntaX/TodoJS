const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoTaskSchema = new Schema({
  name: String,
  dueDate: { type: Date, default: null },
  completionDate: { type: Date, default: null },
  creationDate: Date,
  lastUpdated: Date
});

mongoose.model("todoTasks", todoTaskSchema);
