import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import './style.css';

import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api'

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      console.log(response.data.name);
      history.push('profile')
    } catch (err) {
      alert('Falha no Login verifique seu ID')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoimg} alt="Be the Hero" />
        <form onSubmit={handleLogin} action="">
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesimg} alt="heroes" />
    </div>

  );
}