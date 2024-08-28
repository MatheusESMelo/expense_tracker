import React from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

const App: React.FC = () => {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <AddExpense />
      <ExpenseList />
      <ExpenseChart />
    </div>
  );
};

export default App;
