import { useState } from 'react';

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  let filtered = transactions;
  if (filterType !== 'all') {
    filtered = filtered.filter((t) => t.type === filterType);
  }
  if (filterCategory !== 'all') {
    filtered = filtered.filter((t) => t.category === filterCategory);
  }

  return (
    <div className='transactions'>
      <h2>Transactions</h2>
      <div className='filters'>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value='all'>All Types</option>
          <option value='income'>Income</option>
          <option value='expense'>Expense</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value='all'>All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {(filterType !== 'all' || filterCategory !== 'all') && (
        <div className='filter-badge'>
          Filtered
          {filterType !== 'all' && <span>{filterType}</span>}
          {filterCategory !== 'all' && <span>{filterCategory}</span>}
          <button onClick={() => { setFilterType('all'); setFilterCategory('all'); }}>✕</button>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className='empty-state'>No transactions found</p>
      ) : (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td
                className={
                  t.type === 'income' ? 'income-amount' : 'expense-amount'
                }
              >
                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
              </td>
              <td>
                <button className='delete-btn' onClick={() => onDelete(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default TransactionList;
