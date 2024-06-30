const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  income: [{ amount: Number, source: String, date: Date }],
  expenses: [{ amount: Number, category: String, date: Date }]
});

module.exports = mongoose.model('Budget', BudgetSchema);
