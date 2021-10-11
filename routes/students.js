const express = require('express');
const Student = require('../models/student');
const Router = express.Router();
require("dotenv").config();

// @route POST student
// @desc Save student
// @access Public
Router.post('/', async (req, res) => {
    try {
      const { studentName, userId } = req.body;
      const student = new Student({
        studentName,
        created_by: userId
      });
      await student.save();
      res.send('student saved successfully.');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error while saving student. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);

// @route GET student/:id
// @desc Get all students
// @access Public
Router.get('/:id', async (req, res) => {
  try {
    const students = await Student.find({ created_by: req.params.id });
    const sortedByCreationDate = students.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(500).send('Error while getting list of students. Try again later.');
  }
});

// @route DELETE student/:id
// @desc Delete student
// @access Public
Router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send('student deleted successfully.');
  } catch (error) {
    res.status(400).send('Error while deleting student. Try again later.');
  }
});

module.exports = Router;
