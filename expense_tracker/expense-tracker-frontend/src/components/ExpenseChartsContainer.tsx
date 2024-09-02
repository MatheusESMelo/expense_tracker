import React from "react";
import ExpenseChart from "./ExpenseChart";
import ExpenseByDateChart from "./ExpenseByDateChart";
import ExpenseByAmountChart from "./ExpenseByAmountChart";
import "../styles/ExpenseChartsContainer.css";

const ExpenseChartsContainer: React.FC = () => {
  return (
    <div className="charts-container">
      <ExpenseChart />
      <ExpenseByDateChart />
      <ExpenseByAmountChart />
    </div>
  );
};

export default ExpenseChartsContainer;
