import React, { useState } from 'react';

import '../styles/cadastrogastos.css'; 

export default function FiltroCategoria({ expenses }) {

  const categories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Lazer',
    'Saúde',
    'Educação',
    'Outros'
  ];

  const [selectedCategory, setSelectedCategory] = useState('Todas');


  const filteredExpenses = selectedCategory === 'Todas'
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);

  return (
    
    <div className="gastos-container">
      <h2>Filtro por Categoria de Gastos</h2>

      <div className="filtro-categoria-controls">
        <label htmlFor="category-filter">Filtrar por Categoria:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
        
          <option value="Todas">Todas</option>
          
         
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      
      <ul className="gastos-list" style={{marginTop: '20px'}}>
        {filteredExpenses.length === 0 ? (
          <p className="no-expenses-message">Nenhum gasto encontrado para esta categoria.</p>
        ) : (
          filteredExpenses.map((expense) => (
            <li key={expense.id} className="gasto-item">
              <div>
                <strong>{expense.description}</strong> - R$ {expense.amount.toFixed(2)} ({expense.category}) - <small>{expense.date}</small>
              </div>
              
            </li>
          ))
        )}
      </ul>
    </div>
  );
}