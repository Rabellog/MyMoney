import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4ade80", "#f87171"];
const dadosPorMes = {
  Janeiro: { receitas: 3000, despesas: 2500 },
  Fevereiro: { receitas: 3500, despesas: 2200 },
  Março: { receitas: 4000, despesas: 3100 },
  Abril: { receitas: 3200, despesas: 1800 },
  Maio: { receitas: 5000, despesas: 3600 },
  Junho: { receitas: 2800, despesas: 1900 },
};

export default function RelatorioMensal() {
  const [mesSelecionado, setMesSelecionado] = useState("Maio");
  const { receitas, despesas } = dadosPorMes[mesSelecionado];
  const saldo = receitas - despesas;
  const dataGrafico = [
    { name: "Receitas", value: receitas },
    { name: "Despesas", value: despesas },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Relatório Mensal - {mesSelecionado}</h1>
      <div className="flex justify-center mb-4">
        <select
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(e.target.value)}
          className="p-2 rounded-md border border-gray-300"
        >
          {Object.keys(dadosPorMes).map(mes => (
            <option key={mes} value={mes}>{mes}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResumoCard titulo="Receitas" valor={receitas} cor="text-green-500" />
        <ResumoCard titulo="Despesas" valor={despesas} cor="text-red-500" />
        <ResumoCard titulo="Saldo" valor={saldo} cor={saldo >= 0 ? "text-green-500" : "text-red-500"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Distribuição (Pizza)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={dataGrafico} dataKey="value" nameKey="name" outerRadius={80} label>
                {dataGrafico.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Comparação (Barras)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataGrafico}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ResumoCard({ titulo, valor, cor }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <p className="text-sm text-gray-500">{titulo}</p>
      <p className={`text-2xl font-bold ${cor}`}>R$ {valor}</p>
    </div>
  );
}
