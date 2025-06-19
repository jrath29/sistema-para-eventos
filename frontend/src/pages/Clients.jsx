import { useState, useEffect, useRef } from 'react'
import api from '../services/api';
import Layout from '../components/Layout'
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Clients = () => {

    const [clients, setClients] = useState([]);
    const [events, setEvents] = useState([])
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientEnrollments, setClientEnrollments] = useState([]);

    const getClients = async () => {
        const res = await api.get('/clients/')
        setClients(res.data)
    };

    const getEvents = async () => {
        const res = await api.get('/events/')
        setEvents(res.data)
    }

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

    const modalRef = useRef(null);

    const handleOpenModal = async (client) => {
        getEvents();
        setSelectedClient(client);

        try {
            const res = await api.get(`/enrollments/?client_id=${client.id}`);
            setClientEnrollments(res.data);
        } catch (error) {
            toast.error("Erro ao carregar inscrições do cliente.");
        }

        const modal = new window.bootstrap.Modal(document.getElementById('myModal'));
        modal.show();
    };

    const isAlreadyEnrolled = (eventId) => {
        return clientEnrollments.some(enrollment => enrollment.event.id === eventId);
    };

    useEffect(() => {
        const modalEl = document.getElementById('myModal');
        const handleShown = () => {
            const button = document.getElementById('EventsButton');
            if (button) {
                button.focus();
            }
        };

        if (modalEl) {
            modalEl.addEventListener('shown.bs.modal', handleShown);
        }

        return () => {
            if (modalEl) {
                modalEl.removeEventListener('shown.bs.modal', handleShown);
            }
        };
    }, []);

    const submitEnrollment = async (eventId) => {

        const enrollmentData = {
            client_id: selectedClient.id,
            event_id: eventId
        }

        try {
            await api.post('/enrollments/', enrollmentData)
            toast.success("Cliente inscrito com sucesso!", {hideProgressBar: true})
            setTimeout(() => window.location.reload(), 1800);
        } catch (error) {
            toast.error("Não foi possível executar a ação!")
        }
    }

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
                        <th className='text-center'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td className='text-center'>
                                <button className='btn btn-primary btn-sm'
                                    onClick={() => handleOpenModal(client)}
                                    title='Inscrever'>
                                    <FaPlus/>
                                </button>&nbsp;

                                <Link to={`/client/${client.id}`} className="btn btn-warning btn-sm" title='Editar Cliente'>
                                    <FaPencilAlt/>
                                </Link>&nbsp;

                                <button className="btn btn-danger btn-sm" onClick={() => deleteClient(client.id)} title='Deletar Cliente'>
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="myModal" tabIndex="-1" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Inscrição</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className='text-center'>Escolha o evento para inscrever este participante.</p>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th className='text-center'>Evento</th>
                                        <th className='text-center'>Data</th>
                                        <th className='text-center'>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(event => (
                                        <tr key={event.id} className='text-center'>
                                            <td>{event.name}</td>
                                            <td>{new Date(event.date).toLocaleString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                            }).replace(',', '')}</td>
                                            <td>
                                                <button className='btn btn-primary btn-sm' title='Realizar Inscrição' onClick={() => submitEnrollment(event.id)}>
                                                    <FaPlus/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Clients