import { useState, useEffect } from 'react'
import api from '../services/api';
import Layout from '../components/Layout'
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Events = () => {

    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        const res = await api.get('/events/');
        setEvents(res.data);
    };

    const deleteEvent = async (id) => {
        await api.delete(`/events/${id}/`);
        getEvents();
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <Layout>
            <div className='d-flex justify-content-end'>
                <a href='/event/create' className="btn btn-success">Adicionar Evento</a>
            </div>

            <h1 className='text-center'>Eventos</h1> <hr/>
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
                            <td>{event.date.split('-').reverse().join('/')}</td>
                            <td>{event.address}</td>
                            <td className="text-center">
                                <Link to={`/event/${event.id}`} className="btn btn-warning btn-sm">
                                    <FaPencil/>
                                </Link>&nbsp;
                                <button className="btn btn-danger btn-sm" onClick={() => deleteEvent(event.id)}>
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