import React, { useState } from 'react';
import '../styles/cadastrorecebimentos.css';

export default function CadastroRecebimentos({ incomes, onAddIncome, onDeleteIncome }) {
  const categories = [
    'Salário',
    'Freelance',
    'Investimento',
    'Presente',
    'Aluguel Recebido',
    'Venda',
    'Outros'
  ];

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleAddIncome = (e) => {
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

    const newIncome = {
      id: Date.now(),
      description,
      amount: amountNumerical,
      category,
      date: new Date().toISOString().slice(0, 10),
    };

    onAddIncome(newIncome);
    setDescription('');
    setAmount('');
    setCategory(categories[0]);
  };

  const handleDeleteIncomeClick = (id) => {
    onDeleteIncome(id);
  };

  return (
    <div className="income-container">
      <h2>Cadastro de Recebimentos (Entrada)</h2>

      <form onSubmit={handleAddIncome} className="income-form">
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
        <div className="category-field">
          <label htmlFor="category">Categoria:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar Recebimento</button>
      </form>

      <div className="incomes-list-section">
        <h3>Meus Recebimentos</h3>
        {incomes.length === 0 ? (
          <p className="no-incomes-message">Nenhum recebimento cadastrado ainda.</p>
        ) : (
          <ul className="incomes-list">
            {incomes.map((income) => (
              <li key={income.id} className="income-item">
                <div>
                  <strong>{income.description}</strong> - R$ {income.amount.toFixed(2)} ({income.category}) - <small>{income.date}</small>
                </div>
                <button
                  onClick={() => handleDeleteIncomeClick(income.id)}
                  className="delete-income-button"
                  title="Remover recebimento"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}