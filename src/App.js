import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState(["Food", "Travel", "Shopping"]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [summary, setSummary] = useState({ total: 0, breakdown: {} });

  // Fetch expenses for today on mount
  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchExpenses = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await axios.get(`http://localhost:8000/expenses?date=${today}`);
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://localhost:8000/expenses/summary");
      setSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/expenses/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:8000/expenses", formData);
        if (!categories.includes(formData.category)) {
          setCategories([...categories, formData.category]);
        }
      }
      setFormData({ amount: "", category: "Food", date: "" });
      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setFormData({
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your daily expenses and view insights</p>
      </header>

      {/* Expense Form */}
      <div className="card">
        <h2>{editingId ? "Edit Expense" : "Add New Expense"}</h2>
        <form className="expense-form" onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="newCategory"
            placeholder="Add new category"
            onBlur={(e) => {
              if (e.target.value && !categories.includes(e.target.value)) {
                setCategories([...categories, e.target.value]);
                setFormData({ ...formData, category: e.target.value });
                e.target.value = "";
              }
            }}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingId ? "Update Expense" : "Add Expense"}</button>
        </form>
      </div>

      {/* Expenses List */}
      <div className="card">
        <h2>Today's Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses recorded for today.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>₹{exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>{exp.date}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(exp)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary */}
      <div className="card summary-card">
        <h2>Summary</h2>
        <p>Total Spend: ₹{summary.total}</p>
        <h3>Category Breakdown:</h3>
        <ul>
          {Object.entries(summary.breakdown).map(([cat, amt], idx) => (
            <li key={idx}>
              {cat} – ₹{amt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
