import React, { useState } from 'react';
import '../styles.css'; // Ensure the path is correct

const Income = () => {
  const [incomes, setIncomes] = useState([
    { id: 1, title: 'Monthly Salary', amount: 3000, date: '2024-05-01', category: 'Job' },
    { id: 2, title: 'Investment', amount: 500, date: '2024-06-01', category: 'Investment' }
  ]);

  const [newIncome, setNewIncome] = useState({ title: '', amount: '', date: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  const handleAddIncome = () => {
    if (isEditing) {
      setIncomes(incomes.map(income => 
        income.id === currentId ? { ...newIncome, id: currentId } : income
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      const nextId = incomes.length > 0 ? incomes[incomes.length - 1].id + 1 : 1;
      const income = { ...newIncome, id: nextId, amount: parseFloat(newIncome.amount) };
      setIncomes([...incomes, income]);
    }
    setNewIncome({ title: '', amount: '', date: '', category: '' });
  };

  const handleEdit = (id) => {
    const income = incomes.find(income => income.id === id);
    setNewIncome({ title: income.title, amount: income.amount, date: income.date, category: income.category });
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  return (
    <div className="section">
      <h2>Income</h2>
      <div className="form-container">
        <div className="form-group">
          <input type="text" name="title" value={newIncome.title} onChange={handleChange} placeholder="Title" />
          <input type="number" name="amount" value={newIncome.amount} onChange={handleChange} placeholder="Amount" />
          <input type="date" name="date" value={newIncome.date} onChange={handleChange} placeholder="Date" />
          <input type="text" name="category" value={newIncome.category} onChange={handleChange} placeholder="Category" />
          <button className="btn-green" onClick={handleAddIncome}>{isEditing ? 'Update Income' : 'Add Income'}</button>
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
            {incomes.map(income => (
              <tr key={income.id}>
                <td data-label="ID">{income.id}</td>
                <td data-label="Title">{income.title}</td>
                <td data-label="Amount">{income.amount}</td>
                <td data-label="Date">{income.date}</td>
                <td data-label="Category">{income.category}</td>
                <td data-label="Actions">
                  <div className="action-buttons">
                    <button className="btn-green" onClick={() => handleEdit(income.id)}>Edit</button>
                    <button className="btn-red" onClick={() => handleDelete(income.id)}>Delete</button>
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

export default Income;
