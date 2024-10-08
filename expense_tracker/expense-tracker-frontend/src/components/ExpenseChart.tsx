import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
}

const ExpenseChart: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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

  const categoryMap: { [key: string]: number } = {};
  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) + expense.amount;
  });

  const categories = Object.keys(categoryMap);
  const amounts = categories.map((category) => categoryMap[category]);

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: amounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Expense Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default ExpenseChart;
