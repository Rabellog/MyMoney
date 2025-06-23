import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/relatoriomensal.css';

const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#ffb3ba', '#baffc9', '#bae1ff'];

function getMonthName(m) {
  return [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ][m - 1];
}

export default function RelatorioMensal({ expenses = [], incomes = [] }) {
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());

  const movimentos = [
    ...(incomes || []).map(i => ({ ...i, tipo: 'Receita' })),
    ...(expenses || []).map(e => ({ ...e, tipo: 'Gasto' }))
  ];

  const dadosFiltrados = movimentos.filter(mov => {
    const data = new Date(mov.date);
    return (
      data.getMonth() + 1 === parseInt(mesSelecionado) &&
      data.getFullYear() === parseInt(anoSelecionado)
    );
  });


  const gastosFiltrados = dadosFiltrados.filter(m => m.tipo === 'Gasto');
  const totalGastos = gastosFiltrados.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const dadosCategoriasGastos = [];
  gastosFiltrados.forEach(m => {
    const existente = dadosCategoriasGastos.find(d => d.name === m.category);
    if (existente) {
      existente.value += Number(m.amount);
    } else {
      dadosCategoriasGastos.push({ name: m.category, value: Number(m.amount) });
    }
  });

  const receitasFiltradas = dadosFiltrados.filter(m => m.tipo === 'Receita');
  const totalReceitas = receitasFiltradas.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const dadosCategoriasReceitas = [];
  receitasFiltradas.forEach(m => {
    const existente = dadosCategoriasReceitas.find(d => d.name === m.category);
    if (existente) {
      existente.value += Number(m.amount);
    } else {
      dadosCategoriasReceitas.push({ name: m.category, value: Number(m.amount) });
    }
  });

  const saldo = totalReceitas - totalGastos;

  return (
    <div className="relatorio-mensal-container">
      <h2>Relatório Mensal</h2>
      <div className="relatorio-mensal-filtros">
        <select
          value={mesSelecionado}
          onChange={e => setMesSelecionado(Number(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
          ))}
        </select>
        <input
          type="number"
          value={anoSelecionado}
          onChange={e => setAnoSelecionado(Number(e.target.value))}
          style={{ width: 90 }}
        />
      </div>

      <div className="relatorio-mensal-resumo">
        <div className="relatorio-mensal-card">
          <div className="receitas">Receitas</div>
          <div className="valor-receita">R$ {totalReceitas.toFixed(2)}</div>
          <div className="gastos">Gastos</div>
          <div className="valor-gasto">R$ {totalGastos.toFixed(2)}</div>
          <div className="saldo">Saldo</div>
          <div className="valor-saldo" style={{ color: saldo >= 0 ? '#2ecc40' : '#e74c3c' }}>R$ {saldo.toFixed(2)}</div>
        </div>
      </div>

      <div className="relatorio-mensal-blocos">
        {/* Bloco de Gastos */}
        <div className="relatorio-mensal-bloco">
          <div className="relatorio-mensal-grafico">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={dadosCategoriasGastos}
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {dadosCategoriasGastos.map((entry, index) => (
                    <Cell key={`cell-gasto-${index}`} fill={cores[index % cores.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={v => `R$ ${v.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="relatorio-mensal-grafico-label">Gastos por categoria</div>
          </div>
          <div className="relatorio-mensal-tabela">
            <h3>Gastos do mês</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {gastosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="nenhuma-movimentacao">
                        Nenhum gasto neste mês.
                      </td>
                    </tr>
                  ) : (
                    gastosFiltrados.map((m, i) => (
                      <tr key={i}>
                        <td>{m.date}</td>
                        <td>{m.description}</td>
                        <td>{m.category}</td>
                        <td>R$ {Number(m.amount).toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bloco de Receitas */}
        <div className="relatorio-mensal-bloco">
          <div className="relatorio-mensal-grafico">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={dadosCategoriasReceitas}
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {dadosCategoriasReceitas.map((entry, index) => (
                    <Cell key={`cell-receita-${index}`} fill={cores[index % cores.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={v => `R$ ${v.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="relatorio-mensal-grafico-label">Receitas por categoria</div>
          </div>
          <div className="relatorio-mensal-tabela">
            <h3>Recebimentos do mês</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {receitasFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="nenhuma-movimentacao">
                        Nenhum recebimento neste mês.
                      </td>
                    </tr>
                  ) : (
                    receitasFiltradas.map((m, i) => (
                      <tr key={i}>
                        <td>{m.date}</td>
                        <td>{m.description}</td>
                        <td>{m.category}</td>
                        <td>R$ {Number(m.amount).toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}