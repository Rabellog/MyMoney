import React, { useState } from 'react';
import '../styles/cadastrogastos.css';

export default function CadastroGastos({ expenses, onAddExpense, onDeleteExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const categories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Lazer',
    'Saúde',
    'Educação',
    'Outros'
  ];
  const [category, setCategory] = useState(categories[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description || !amount || !category) {
      alert('Por favor, preencha a descrição, o valor e a categoria.');
      return;
    }

    const amountNumerical = parseFloat(amount.replace(',', '.'));
    if (isNaN(amountNumerical)) {
      alert('Valor inválido!');
      return;
    }
    onAddExpense({
      description,
      amount: amountNumerical,
      category,
      date: new Date().toISOString().slice(0, 10) 
    });
    setDescription('');
    setAmount('');
    setCategory(categories[0]);
  }

  const handleDeleteExpenseClick = (id) => {
    onDeleteExpense(id);
  };

  return (
    <div className="gastos-container">
      <h2>Cadastro de Gastos (Saída)</h2>

      <form onSubmit={handleSubmit} className="gasto-form">
        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Valor (R$):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="categoria-field">
          <label htmlFor="category">Categoria:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar Gasto</button>
      </form>

      <h3>Meus Gastos</h3>
      <ul className="gastos-list">
        {expenses.length === 0 ? (
          <p className="no-expenses-message">Nenhum gasto cadastrado ainda.</p>
        ) : (
          expenses.map((expense) => (
            <li key={expense.id} className="gasto-item">
              <div>
                <strong>{expense.description}</strong> - R$ {expense.amount.toFixed(2)} ({expense.category}) - <small>{expense.date}</small>
              </div>
              <button
                onClick={() => handleDeleteExpenseClick(expense.id)}
                className="delete-expense-button"
                title="Remover gasto"
              >
                &times;
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}