import { useState } from 'react';

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!description.trim()) e.description = 'Description is required';
    const parsed = parseFloat(amount);
    if (!amount) e.amount = 'Amount is required';
    else if (isNaN(parsed)) e.amount = 'Must be a number';
    else if (parsed <= 0) e.amount = 'Must be greater than 0';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }

    onAdd({
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString('en-CA'),
    });

    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('food');
    setErrors({});
  };

  return (
    <div className='add-transaction'>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className='field-wrap'>
          <input
            type='text'
            placeholder='Description'
            value={description}
            className={errors.description ? 'input-error' : ''}
            onChange={(e) => { setDescription(e.target.value); if (errors.description) setErrors((p) => ({ ...p, description: undefined })); }}
          />
          {errors.description && <span className='field-error'>{errors.description}</span>}
        </div>
        <div className='field-wrap'>
          <input
            type='number'
            placeholder='Amount'
            value={amount}
            min='0.01'
            step='0.01'
            className={errors.amount ? 'input-error' : ''}
            onChange={(e) => { setAmount(e.target.value); if (errors.amount) setErrors((p) => ({ ...p, amount: undefined })); }}
          />
          {errors.amount && <span className='field-error'>{errors.amount}</span>}
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value='income'>Income</option>
          <option value='expense'>Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
