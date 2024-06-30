const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');  // Corrected path

// Add income
router.post('/income', auth, async (req, res) => {
  const budget = await Budget.findOne({ userId: req.user.userId });
  if (budget) {
    budget.income.push(req.body);
    await budget.save();
  } else {
    await new Budget({ userId: req.user.userId, income: [req.body], expenses: [] }).save();
  }
  res.status(200).send('Income added');
});

// Add expense
router.post('/expense', auth, async (req, res) => {
  const budget = await Budget.findOne({ userId: req.user.userId });
  if (budget) {
    budget.expenses.push(req.body);
    await budget.save();
  } else {
    await new Budget({ userId: req.user.userId, income: [], expenses: [req.body] }).save();
  }
  res.status(200).send('Expense added');
});

// Get budget report
router.get('/report', auth, async (req, res) => {
  const budget = await Budget.findOne({ userId: req.user.userId });
  res.json(budget);
});

module.exports = router;
