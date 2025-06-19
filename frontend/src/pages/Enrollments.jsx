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
        try{
            await api.delete(`/enrollments/${id}/`);
            toast.success("Inscrição desfeita com sucesso!")
            getEnrollments();
        } catch(error){
            toast.error("Não foi possível executar a ação!")
        }
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
                        <th className='text-center'>Nome</th>
                        <th className='text-center'>Evento</th>
                        <th className='text-center'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment => (
                        <tr key={enrollment.id}>
                            <td className='text-center'>{enrollment.client.name}</td>
                            <td className='text-center'>{enrollment.event.name}</td>
                            <td className='text-center'>
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