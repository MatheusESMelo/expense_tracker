import React, { useState, useEffect } from "react";
import axios from "axios";
import EditExpense from "./EditExpense";

interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editExpenseId, setEditExpenseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/expenses/");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleEditClick = (id: number) => {
    setEditExpenseId(id);
  };

  const handleCloseEdit = () => {
    setEditExpenseId(null);
    fetchExpenses();
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/expenses/${id}/`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/expenses/");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div>
      <h2>Expense List</h2>
      {editExpenseId && (
        <EditExpense expenseId={editExpenseId} onClose={handleCloseEdit} />
      )}
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <p>
                <strong>Date:</strong> {expense.date}
              </p>
              <p>
                <strong>Category:</strong> {expense.category}
              </p>
              <p>
                <strong>Amount:</strong> ${expense.amount}
              </p>
              <p>
                <strong>Description:</strong> {expense.description}
              </p>
              <button onClick={() => handleEditClick(expense.id)}>Edit</button>
              <button onClick={() => handleDelete(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
