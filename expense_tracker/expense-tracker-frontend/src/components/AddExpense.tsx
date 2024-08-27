import React, { useState } from "react";
import axios from "axios";

const AddExpense: React.FC = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleAddExpense = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/expenses/", {
        description,
        amount,
        date,
        category,
      });

      if (response.status === 201) {
        alert("Expense added successfully!");
      } else {
        alert("Failed to add expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense.");
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddExpense();
        }}
      >
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
