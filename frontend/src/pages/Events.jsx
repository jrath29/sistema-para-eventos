import { useState, useEffect } from 'react'
import api from '../services/api';
import Layout from '../components/Layout'
import { FaTrash,FaPencilAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Events = () => {

    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        const res = await api.get('/events/');
        setEvents(res.data);
    };

    const deleteEvent = async (id) => {
        try{
            await api.delete(`/events/${id}/`);
            getEvents();
            toast.success("Evento deletado com sucesso!")
        } catch(error){
            toast.error("Não foi possível executar essa ação!")
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <Layout>
            <div className='d-flex justify-content-end'>
                <a href='/event/create' className="btn btn-success">Adicionar Evento</a>
            </div>
            <h1 className='text-center'>Eventos</h1>
            <p className='text-center'>Crie, edite e visualize eventos disponíveis.</p> <hr/>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Endereço</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                           <td>{new Date(event.date).toLocaleString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                            }).replace(',', '')}</td>
                            <td>{event.address}</td>
                            <td className="text-center">
                                <Link to={`/event/${event.id}`} className="btn btn-warning btn-sm" title='Editar Evento'>
                                    <FaPencilAlt/>
                                </Link>&nbsp;
                                <button className="btn btn-danger btn-sm" onClick={() => deleteEvent(event.id)} title='Deletar Evento'>
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

export default Events