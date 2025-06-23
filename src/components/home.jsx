import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import CadastroGastos from './cadastrogastos';
import GraficoPizza from './graficopizza';
import RelatorioMensal from './relatoriomensal';
import CadastroRecebimentos from './cadastrorecebimentos';
import FiltroCategoria from './filtrocategoria';

import '../styles/home.css';

const navLinkStyles = ({ isActive }) => {
  return {
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
  };
};

export default function App({ onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  function handleAddExpense(expense) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: Date.now() }
    ]);
  }

  function handleDeleteExpense(id) {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }

  function handleAddIncome(income) {
    setIncomes(prev => [
      ...prev,
      { ...income, id: Date.now() }
    ]);
  }

  return (
    <div className="home-container">
      <nav className="home-nav">
        <NavLink to="/gastos" className="nav-button" style={navLinkStyles}>
          Cadastro de Gastos
        </NavLink>
        <NavLink to="/recebimentos" className="nav-button" style={navLinkStyles}>
          Cadastro de Recebimentos
        </NavLink>
        <NavLink to="/relatorio" className="nav-button" style={navLinkStyles}>
          Relatório Mensal
        </NavLink>
        <NavLink to="/filtro" className="nav-button" style={navLinkStyles}>
          Filtro por Categoria
        </NavLink>
        <button className="nav-button logout-button" onClick={onLogout}>
          Logout
        </button>
      </nav>

      <div className="home-content">
        <Routes>
          <Route path="/" element={<Navigate to="/gastos" />} />

          <Route
            path="/gastos"
            element={
              <>
                <CadastroGastos
                  expenses={expenses}
                  onAddExpense={handleAddExpense}
                  onDeleteExpense={handleDeleteExpense}
                />
                <GraficoPizza gastos={expenses} />
              </>
            }
          />
          <Route
            path="/recebimentos"
            element={
              <CadastroRecebimentos
                incomes={incomes}
                onAddIncome={handleAddIncome}
              />
            }
          />
          <Route
            path="/relatorio"
            element={<RelatorioMensal expenses={expenses} incomes={incomes} />}
          />
          <Route
            path="/filtro"
            element={<FiltroCategoria expenses={expenses} />}
          />
          
          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </div>
    </div>
  );
}