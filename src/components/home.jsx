import React, { useState } from 'react'; 
import CadastroGastos from './cadastrogastos';
import GraficoPizza from './graficopizza';
import RelatorioMensal from './relatoriomensal';
import CadastroRecebimentos from './cadastrorecebimentos';

import '../styles/home.css';

export default function Home({ onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [telaAtual, setTelaAtual] = useState('cadastroGastos');

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

  const FiltroCategoria = () => <div>Filtro por Categoria (implemente aqui)</div>;

  return (
    <div className="home-container">
      <nav className="home-nav">
        <button className="nav-button" onClick={() => setTelaAtual('cadastroGastos')}>
          Cadastro de Gastos
        </button>
        <button className="nav-button" onClick={() => setTelaAtual('cadastroRecebimentos')}>
          Cadastro de Recebimentos
        </button>
        <button className="nav-button" onClick={() => setTelaAtual('relatorioMensal')}>
          Relatório Mensal
        </button>
        <button className="nav-button" onClick={() => setTelaAtual('filtroCategoria')}>
          Filtro por Categoria
        </button>
        <button className="nav-button logout-button" onClick={onLogout}>
          Logout
        </button>
      </nav>

      <div className="home-content">
        {telaAtual === 'cadastroGastos' && (
          <>
            <CadastroGastos
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
            />
            <GraficoPizza gastos={expenses} />
          </>
        )}
        {telaAtual === 'cadastroRecebimentos' && (
          <CadastroRecebimentos
            incomes={incomes}
            onAddIncome={handleAddIncome}
          />
        )}
        {telaAtual === 'relatorioMensal' && (
          <RelatorioMensal expenses={expenses} incomes={incomes} />
        )}
        {telaAtual === 'filtroCategoria' && (
          <FiltroCategoria expenses={expenses} />
        )}
      </div>
    </div>
  );
}