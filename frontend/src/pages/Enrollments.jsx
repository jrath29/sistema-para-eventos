import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../services/api'
import { FaTrash } from "react-icons/fa";

const Enrollments = () => {

    const [enrollments, setEnrollments] = useState([])

    const getEnrollments = async () => {
        const res = await api.get('/enrollments/');
        setEnrollments(res.data);
    };

    const deleteEnrollment = async (id) => {
        await api.delete(`/enrollments/${id}/`);
        getEnrollments();
    };

    useEffect(() => {
        getEnrollments();
    }, []);

    return(
        <Layout>
            <h1 className="text-center">Inscrições</h1>
            <p className='text-center'>Veja aqui todas as inscrições feitas nos eventos.</p> <hr/>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Evento</th>
                        <th className='text-center'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment => (
                        <tr key={enrollment.id}>
                            <td>{enrollment.client}</td>
                            <td>{enrollment.event}</td>
                            <td>
                                <button className='btn btn-danger btn-sm' onClick={() => deleteEnrollment(enrollment.id)} title='Desfazer Inscrição'>
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

export default Enrollments