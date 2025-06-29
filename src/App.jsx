import React, { useState } from 'react'
import './styles/global.css';
import Login from './components/login'
import Home from './components/home'

export default function App() {
  const [page, setPage] = useState('login')

  return (
    <>
      {page === 'login' && <Login onLogin={() => setPage('home')} />}
      {page === 'home' && <Home onLogout={() => setPage('login')} />}
    </>
  )
}