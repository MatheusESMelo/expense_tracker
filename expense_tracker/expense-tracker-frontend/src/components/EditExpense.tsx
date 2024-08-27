import React, { useState, useEffect } from "react";
import axios from "axios";

interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
}

interface EditExpenseProps {
  expenseId: number;
  onClose: () => void;
}

const EditExpense: React.FC<EditExpenseProps> = ({ expenseId, onClose }) => {
  const [expense, setExpense] = useState<Expense | null>(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/expenses/${expenseId}/`
        );
        const data = response.data;
        setExpense(data);
        setDate(data.date);
        setCategory(data.category);
        setAmount(data.amount);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/expenses/${expenseId}/`, {
        date,
        category,
        amount,
        description,
      });
      onClose();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  if (!expense) return null;

  return (
    <div className="modal">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
