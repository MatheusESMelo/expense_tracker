import React from "react";
import AddExpense from "./components/AddExpense";

const App: React.FC = () => {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <AddExpense />
    </div>
  );
};

export default App;
