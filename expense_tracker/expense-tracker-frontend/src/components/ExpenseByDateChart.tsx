import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
}

const ExpenseByDateChart: React.FC = () => {
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

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const dates = sortedExpenses.map((expense) => expense.date);
  const amounts = sortedExpenses.map((expense) => expense.amount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Expenses by Date",
        data: amounts,
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Expenses by Date</h2>
      <Line data={data} />
    </div>
  );
};

export default ExpenseByDateChart;
