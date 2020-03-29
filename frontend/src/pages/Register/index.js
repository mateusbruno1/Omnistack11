import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './style.css';
import logoimg from '../../assets/logo.svg';



export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso ${response.data.id}`);
      history.push('/');

    } catch (err) {
      alert('Erro no cadastro,tente novamente')
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoimg} alt="" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro,entre na plaltaforma e ajude pessoas a encontrarem os casos da sua ONG</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não, tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da Ong"
            type="text"
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="E-mail"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            type="text"
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              type="text"
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              type="text"
              style={{ width: 80 }}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  )
}