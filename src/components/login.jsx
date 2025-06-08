import React from 'react'

export default function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
