import { useState, useEffect } from 'react'
import api from '../services/api';
import Layout from '../components/Layout'
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Clients = () => {

    const [clients, setClients] = useState([]);

    const getClients = async () => {
        const res = await api.get('/clients/');
        setClients(res.data);
    };

    const deleteClient = async (id) => {
        try{
            await api.delete(`/clients/${id}/`);
            toast.success("Cliente deletado com sucesso!")
            getClients();
        } catch(error){
            toast.error("Não foi possível executar essa ação!")
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    return (
        <Layout>
            <div className='d-flex justify-content-end'>
                <a href='/client/create' className='btn btn-success'>Cadastrar Cliente</a>
            </div>
            <h1 className="text-center mb-3">Clientes</h1>
            <p className='text-center'>Cadastre e gerencie os participantes dos eventos.</p> <hr/>

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
                                <Link to={`/client/${client.id}`} className="btn btn-warning btn-sm" title='Editar Cliente'>
                                    <FaPencil/>
                                </Link>&nbsp;
                                <button className="btn btn-danger btn-sm" onClick={() => deleteClient(client.id)} title='Deletar Cliente'>
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