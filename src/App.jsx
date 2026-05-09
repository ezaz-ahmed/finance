import { useState } from 'react';
import './App.css';
import Summary from './Summary';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import SpendingChart from './SpendingChart';
import ConfirmDialog from './ConfirmDialog';

const categories = [
  'food',
  'housing',
  'utilities',
  'transport',
  'entertainment',
  'salary',
  'other',
];

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: 'Salary',
      amount: 5000,
      type: 'income',
      category: 'salary',
      date: '2025-01-01',
    },
    {
      id: 2,
      description: 'Rent',
      amount: 1200,
      type: 'expense',
      category: 'housing',
      date: '2025-01-02',
    },
    {
      id: 3,
      description: 'Groceries',
      amount: 150,
      type: 'expense',
      category: 'food',
      date: '2025-01-03',
    },
    {
      id: 4,
      description: 'Freelance Work',
      amount: 800,
      type: 'income',
      category: 'salary',
      date: '2025-01-05',
    },
    {
      id: 5,
      description: 'Electric Bill',
      amount: 95,
      type: 'expense',
      category: 'utilities',
      date: '2025-01-06',
    },
    {
      id: 6,
      description: 'Dinner Out',
      amount: 65,
      type: 'expense',
      category: 'food',
      date: '2025-01-07',
    },
    {
      id: 7,
      description: 'Gas',
      amount: 45,
      type: 'expense',
      category: 'transport',
      date: '2025-01-08',
    },
    {
      id: 8,
      description: 'Netflix',
      amount: 15,
      type: 'expense',
      category: 'entertainment',
      date: '2025-01-10',
    },
  ]);

  const [pendingDelete, setPendingDelete] = useState(null);

  const handleDeleteTransaction = (id) => {
    const t = transactions.find((t) => t.id === id);
    setPendingDelete(t);
  };

  const handleConfirmDelete = () => {
    setTransactions((prev) => prev.filter((t) => t.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const handleAddTransaction = (transaction) => {
    setPendingDelete(null);
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <div className='app'>
      <h1>Finance Tracker</h1>
      <p className='subtitle'>Track your income and expenses</p>

      <Summary transactions={transactions} />
      <SpendingChart transactions={transactions} />

      <TransactionForm categories={categories} onAdd={handleAddTransaction} />

      <TransactionList
        transactions={transactions}
        categories={categories}
        onDelete={handleDeleteTransaction}
      />

      {pendingDelete && (
        <ConfirmDialog
          description={pendingDelete.description}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}

export default App;
