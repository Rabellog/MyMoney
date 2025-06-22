import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RelatorioMensal = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());

  useEffect(() => {
    const dadosSimulados = [
      { tipo: 'receita', valor: 3000, categoria: 'Salário', data: '2025-06-01' },
      { tipo: 'gasto', valor: 1200, categoria: 'Aluguel', data: '2025-06-02' },
      { tipo: 'gasto', valor: 400, categoria: 'Mercado', data: '2025-06-04' },
      { tipo: 'receita', valor: 500, categoria: 'Freelance', data: '2025-06-10' },
      { tipo: 'gasto', valor: 200, categoria: 'Transporte', data: '2025-06-15' },
    ];
    setMovimentacoes(dadosSimulados);
  }, [mesSelecionado, anoSelecionado]);

  const filtrarPorMesAno = mov => {
    const data = new Date(mov.data);
    return (
      data.getMonth() + 1 === parseInt(mesSelecionado) &&
      data.getFullYear() === parseInt(anoSelecionado)
    );
  };

  const dadosFiltrados = movimentacoes.filter(filtrarPorMesAno);

  const totalReceitas = dadosFiltrados
    .filter(m => m.tipo === 'receita')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const totalGastos = dadosFiltrados
    .filter(m => m.tipo === 'gasto')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const saldo = totalReceitas - totalGastos;

  const dadosCategorias = [];
  dadosFiltrados.filter(m => m.tipo === 'gasto').forEach(m => {
    const existente = dadosCategorias.find(d => d.name === m.categoria);
    if (existente) {
      existente.value += m.valor;
    } else {
      dadosCategorias.push({ name: m.categoria, value: m.valor });
    }
  });

  const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Relatório Mensal</h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <select value={mesSelecionado} onChange={e => setMesSelecionado(e.target.value)} className="border p-2 rounded">
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <input
          type="number"
          value={anoSelecionado}
          onChange={e => setAnoSelecionado(e.target.value)}
          className="border p-2 rounded w-24"
        />
      </div>

      <div className="border rounded p-4 shadow bg-gray-50">
        <div className="text-lg">Receitas: <span className="text-green-600 font-semibold">R$ {totalReceitas.toFixed(2)}</span></div>
        <div className="text-lg">Gastos: <span className="text-red-600 font-semibold">R$ {totalGastos.toFixed(2)}</span></div>
        <div className="text-lg font-bold">Saldo: R$ {saldo.toFixed(2)}</div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="value" data={dadosCategorias} outerRadius={80} label>
              {dadosCategorias.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Movimentações</h3>
        <div className="overflow-auto">
          <table className="w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Data</th>
                <th className="border px-3 py-2">Categoria</th>
                <th className="border px-3 py-2">Tipo</th>
                <th className="border px-3 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {dadosFiltrados.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{m.data}</td>
                  <td className="border px-3 py-2">{m.categoria}</td>
                  <td className="border px-3 py-2">{m.tipo}</td>
                  <td className="border px-3 py-2">R$ {m.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RelatorioMensal;