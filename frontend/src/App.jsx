import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './services/api';

function App() {

  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const fetchClients = async () => {
    const res = await api.get('/clients/');
    setClients(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/clients/', form);
    setForm({ name: '', email: '', phone: '' });
    fetchClients();
  };

  const handleDelete = async (id) => {
    await api.delete(`/clients/${id}/`);
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
     <div>
      <h1>Clientes</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Telefone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.name} - {client.email} - {client.phone}
            <button onClick={() => handleDelete(client.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
