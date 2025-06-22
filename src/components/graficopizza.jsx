import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function GraficoPizza({ gastos }) {
  const categorias = {};
  (Array.isArray(gastos) ? gastos : []).forEach(gasto => {
    categorias[gasto.categoria] = (categorias[gasto.categoria] || 0) + gasto.valor;
  });

  const data = {
    labels: Object.keys(categorias),
    datasets: [
      {
        data: Object.values(categorias),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8AFFC1', '#FF8A8A'],
      },
    ],
  };

  return (
    <div>
      <h3>Gastos por Categoria</h3>
      {data.labels.length > 0 ? (
        <Pie data={data} />
      ) : (
        <p>Nenhum gasto cadastrado ainda.</p>
      )}
    </div>
  );
}