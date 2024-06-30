import React, { useState } from 'react';
import '../styles.css'; // Ensure the path is correct

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Water Bill', amount:  30, date: '2024-05-01', category: 'Utilities' },
    { id: 2, title: 'Rent', amount: 500, date: '2024-06-05', category: 'Housing' },
    { id: 3, title: 'Groceries', amount: 150, date: '2024-06-01', category: 'Food' }
  ]);

  const [newExpense, setNewExpense] = useState({ title: '', amount: '', date: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = () => {
    if (isEditing) {
      setExpenses(expenses.map(expense => 
        expense.id === currentId ? { ...newExpense, id: currentId } : expense
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      const nextId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
      const expense = { ...newExpense, id: nextId, amount: parseFloat(newExpense.amount) };
      setExpenses([...expenses, expense]);
    }
    setNewExpense({ title: '', amount: '', date: '', category: '' });
  };

  const handleEdit = (id) => {
    const expense = expenses.find(expense => expense.id === id);
    setNewExpense({ title: expense.title, amount: expense.amount, date: expense.date, category: expense.category });
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="section">
      <h2>Expenses</h2>
      <div className="form-container">
        <div className="form-group">
          <input type="text" name="title" value={newExpense.title} onChange={handleChange} placeholder="Title" />
          <input type="number" name="amount" value={newExpense.amount} onChange={handleChange} placeholder="Amount" />
          <input type="date" name="date" value={newExpense.date} onChange={handleChange} placeholder="Date" />
          <input type="text" name="category" value={newExpense.category} onChange={handleChange} placeholder="Category" />
          <button className="btn-green" onClick={handleAddExpense}>{isEditing ? 'Update Expense' : 'Add Expense'}</button>
        </div>
      </div>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td data-label="ID">{expense.id}</td>
                <td data-label="Title">{expense.title}</td>
                <td data-label="Amount">{expense.amount}</td>
                <td data-label="Date">{expense.date}</td>
                <td data-label="Category">{expense.category}</td>
                <td data-label="Actions">
                  <div className="action-buttons">
                    <button className="btn-green" onClick={() => handleEdit(expense.id)}>Edit</button>
                    <button className="btn-red" onClick={() => handleDelete(expense.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
