import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
}

const ExpenseByAmountChart: React.FC = () => {
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

  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Amount",
        data: amounts,
        backgroundColor: backgroundColors.slice(0, categories.length),
        borderColor: borderColors.slice(0, categories.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Expenses by Amount</h2>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseByAmountChart;
