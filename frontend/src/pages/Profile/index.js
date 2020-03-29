import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import './style.css';
import api from '../../services/api';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);
  async function handleDeleteIncidents(id) {
    try {
      console.log('entrei')
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso tente novamente')
    }
  }
  async function handleLogout() {
    localStorage.clear();
    history.push('/')
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoimg} alt="Be the Hero" />
        <span>Bem Vindo, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>
            <strong>Descrição:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
            <button onClick={() => handleDeleteIncidents(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}

      </ul>
    </div>
  )
}