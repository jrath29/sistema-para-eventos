import { useState, useEffect } from 'react'
import api from '../services/api';
import Layout from '../components/Layout'
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Clients = () => {

    const [clients, setClients] = useState([]);

    const getClients = async () => {
        const res = await api.get('/clients/');
        setClients(res.data);
    };

    const deleteClient = async (id) => {
        await api.delete(`/clients/${id}/`);
        getClients();
    };

    useEffect(() => {
        getClients();
    }, []);

    return (
        <Layout>
            <div className='d-flex justify-content-end'>
                <a href='/client/create' className='btn btn-success'>Cadastrar Cliente</a>
            </div>
            <h1 className="text-center mb-3">Clientes</h1> <hr/>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>Telefone</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td className="text-center">
                                <Link to={`/client/${client.id}`} className="btn btn-warning btn-sm">
                                    <FaPencil/>
                                </Link>&nbsp;
                                <button className="btn btn-danger btn-sm" onClick={() => deleteClient(client.id)}>
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Clients