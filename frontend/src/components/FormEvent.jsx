import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import Layout from '../components/Layout'

const FormEvent = () => {
    const inputName = useRef()
    const inputDate = useRef()
    const inputAddress = useRef()

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
        api.get(`/events/${id}/`)
            .then((response) => {
            const client = response.data
            inputName.current.value = client.name
            inputDate.current.value = client.date
            inputAddress.current.value = client.address
            })
            .catch((error) => {
            console.error("Erro ao carregar evento:", error)
            alert("Erro ao carregar dados do evento.")
            })
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const eventData = {
        name: inputName.current.value,
        date: inputDate.current.value,
        address: inputAddress.current.value,
        }

        try {
        if (id) {
            await api.put(`/events/${id}/`, eventData)
        } else {
            await api.post('/events/', eventData)
        }
        navigate('/events')

        } catch (error) {
        console.error("Erro ao salvar evento:", error)
        alert("Erro ao salvar evento. Veja o console.")
        }
    }
    return(
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text">Nome:</span>
                    <input name="name" type="text" className="form-control" ref={inputName} required />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Datra:</span>
                    <input name="date" type="date" className="form-control" ref={inputDate} required />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Endereço:</span>
                    <input name="address" type="text" className="form-control" ref={inputAddress} required />
                </div>

                <div className='d-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary">
                        {id ? 'Salvar' : 'Adicionar'}
                    </button>
                </div>
            </form>
        </Layout>
    )
}

export default FormEvent