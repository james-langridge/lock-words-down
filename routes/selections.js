const express = require('express');
const Selection = require('../models/selection');
const Router = express.Router();
require("dotenv").config();

// @route POST selection/save
// @desc Save selection
// @access Public
Router.post('/selection', async (req, res) => {
    try {
      const { selectionTitle, gameTitle, selectedWords, userId } = req.body;
      const selection = new Selection({
        selectionTitle,
        gameTitle,
        selection: selectedWords,
        created_by: userId
      });
      await selection.save();
      res.send('selection saved successfully.');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error while saving selection. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);

// @route GET selection/getAllSelections
// @desc Get all selections
// @access Public
Router.get('/getAllSelections/:id', async (req, res) => {
  try {
    const selections = await Selection.find({ created_by: req.params.id });
    const sortedByCreationDate = selections.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(500).send('Error while getting list of selections. Try again later.');
  }
});

// @route DELETE selection/deleteSelection/:id
// @desc Delete selection
// @access Public
Router.delete('/deleteSelection/:id', async (req, res) => {
  try {
    await Selection.findByIdAndDelete(req.params.id);
    res.send('selection deleted successfully.');
  } catch (error) {
    res.status(400).send('Error while deleting selection. Try again later.');
  }
});

module.exports = Router;
