import React, { useState, useEffect } from "react";
import axios from "axios";
import EditExpense from "./EditExpense";
import "../styles/ExpenseListCss.css";

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
  const [sortColumn, setSortColumn] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Extracted fetchExpenses function to be used across the component
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/expenses/");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);

    const sortedExpenses = [...expenses].sort((a, b) => {
      if (a[column as keyof Expense] < b[column as keyof Expense]) {
        return newDirection === "asc" ? -1 : 1;
      }
      if (a[column as keyof Expense] > b[column as keyof Expense]) {
        return newDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setExpenses(sortedExpenses);
  };

  const handleEditClick = (id: number) => {
    setEditExpenseId(id);
  };

  const handleCloseEdit = () => {
    setEditExpenseId(null);
    fetchExpenses(); // This function is now available for use here
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/expenses/${id}/`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <h2>Expense List</h2>
      {editExpenseId && (
        <EditExpense expenseId={editExpenseId} onClose={handleCloseEdit} />
      )}
      {expenses.length > 0 ? (
        <table className="expense-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("date")}>
                Date{" "}
                {sortColumn === "date" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("category")}>
                Category{" "}
                {sortColumn === "category" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("amount")}>
                Amount{" "}
                {sortColumn === "amount" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("description")}>
                Description{" "}
                {sortColumn === "description" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>${expense.amount}</td>
                <td>{expense.description}</td>
                <td>
                  <button onClick={() => handleEditClick(expense.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(expense.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
