import React from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChartsContainer from "./components/ExpenseChartsContainer";
import "./chartConfig";

const App: React.FC = () => {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <AddExpense />
      <ExpenseList />
      <ExpenseChartsContainer />
    </div>
  );
};

export default App;
