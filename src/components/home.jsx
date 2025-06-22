import React, { useState, useEffect } from 'react'; // Import useEffect
import CadastroGastos from './cadastrogastos';
import CadastroRecebimentos from './cadastrorecebimentos';
import RelatorioMensal from './relatoriomensal';
import FiltroCategoria from './filtrocategoria';

import '../styles/home.css';

export default function Home({ onLogout }) {
  const [telaAtual, setTelaAtual] = useState('home');

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('spendingTrackerExpenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('spendingTrackerExpenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
  };

  const renderTela = () => {
    switch (telaAtual) {
      case 'cadastroGastos':
        return (
          <CadastroGastos
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        );
      case 'cadastroRecebimentos':
        return <CadastroRecebimentos />;
      case 'relatorioMensal':
        return <RelatorioMensal expenses={expenses} />;
      case 'filtroCategoria':
        return <FiltroCategoria expenses={expenses} />;
      default:
        return (
          <div className="home-content">
            <h1>Bem-vindo à Página Inicial!</h1>
            <p>Escolha uma opção no menu acima.</p>
          </div>
        );
    }
  };

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

      <div className="home-content">{renderTela()}</div>
    </div>
  );
}