import React, { useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import RelatorioMensal from './components/relatoriomensal'

export default function App() {
  const [page, setPage] = useState('login')

  return (
    <>
      {page === 'login' && <Login onLogin={() => setPage('home')} />}
      {page === 'home' && <Home onRelatorio={() => setPage('relatorio')} />}
      {page === 'relatorio' && <RelatorioMensal />}
    </>
  )
}
