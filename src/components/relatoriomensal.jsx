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

  const totalReceitas = dadosFiltrados
    .filter(m => m.tipo === 'Receita')
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const totalGastos = dadosFiltrados
    .filter(m => m.tipo === 'Gasto')
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const saldo = totalReceitas - totalGastos;


  const dadosCategorias = [];
  dadosFiltrados.filter(m => m.tipo === 'Gasto').forEach(m => {
    const existente = dadosCategorias.find(d => d.name === m.category);
    if (existente) {
      existente.value += Number(m.amount);
    } else {
      dadosCategorias.push({ name: m.category, value: Number(m.amount) });
    }
  });

  return (
    <div className="relatorio-mensal-container" style={{
      maxWidth: 800,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px #0001',
      padding: 32
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Relatório Mensal</h2>
      <div className="relatorio-mensal-filtros" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
        <select
          value={mesSelecionado}
          onChange={e => setMesSelecionado(Number(e.target.value))}
          style={{ padding: 8, borderRadius: 6 }}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
          ))}
        </select>
        <input
          type="number"
          value={anoSelecionado}
          onChange={e => setAnoSelecionado(Number(e.target.value))}
          style={{ padding: 8, borderRadius: 6, width: 90 }}
        />
      </div>

      <div className="relatorio-mensal-resumo" style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32
      }}>
        <div className="relatorio-mensal-card" style={{
          minWidth: 220,
          background: '#f5f5f5',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 2px 8px #0001'
        }}>
          <div style={{ color: '#36A2EB', fontWeight: 'bold', fontSize: 18 }}>Receitas</div>
          <div style={{ fontSize: 22, color: '#2ecc40' }}>R$ {totalReceitas.toFixed(2)}</div>
          <div style={{ color: '#FF6384', fontWeight: 'bold', fontSize: 18, marginTop: 12 }}>Gastos</div>
          <div style={{ fontSize: 22, color: '#e74c3c' }}>R$ {totalGastos.toFixed(2)}</div>
          <div style={{ color: '#333', fontWeight: 'bold', fontSize: 18, marginTop: 12 }}>Saldo</div>
          <div style={{ fontSize: 22, color: saldo >= 0 ? '#2ecc40' : '#e74c3c' }}>R$ {saldo.toFixed(2)}</div>
        </div>
        <div className="relatorio-mensal-grafico" style={{ width: 320, height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={dadosCategorias}
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {dadosCategorias.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                ))}
              </Pie>
              <Tooltip formatter={v => `R$ ${v.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: 8, color: '#888' }}>
            Gastos por categoria
          </div>
        </div>
      </div>

      <div className="relatorio-mensal-tabela">
        <h3 style={{ marginBottom: 12 }}>Movimentações do mês</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f0f0f0' }}>
              <tr>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Data</th>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Descrição</th>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Categoria</th>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Tipo</th>
                <th style={{ padding: 8, border: '1px solid #ddd' }}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {dadosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 16, color: '#888' }}>
                    Nenhuma movimentação neste mês.
                  </td>
                </tr>
              ) : (
                dadosFiltrados.map((m, i) => (
                  <tr key={i}>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{m.date}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{m.description}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{m.category}</td>
                    <td style={{ padding: 8, border: '1px solid #eee', color: m.tipo === 'Receita' ? '#2ecc40' : '#e74c3c', fontWeight: 'bold' }}>{m.tipo}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>R$ {Number(m.amount).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}