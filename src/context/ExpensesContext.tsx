"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Expense = { name: string; price: number };

type ExpensesContextType = {
  expenses: Expense[];
  isLoading: boolean;
  addExpense: (expense: Expense) => void;
  removeExpense: (name: string) => void;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export default function ExpensesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const removeExpense = (name: string) => {
    setExpenses((prev) => prev.filter((item) => item.name !== name));
  };

  // Get Expenses
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
      setIsLoading(false);
    }
  }, []);

  // Set Expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, removeExpense, isLoading }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within ExpensesProvider");
  }
  return context;
}
