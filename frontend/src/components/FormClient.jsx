import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import Layout from '../components/Layout'
import { toast } from 'react-toastify'

const FormClient = () => {
  const inputName = useRef()
  const inputEmail = useRef()
  const inputPhone = useRef()

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}/`)
        .then((response) => {
          const client = response.data
          inputName.current.value = client.name
          inputEmail.current.value = client.email
          inputPhone.current.value = client.phone
        })
        .catch((error) => {
          console.error("Erro ao carregar cliente:", error)
          alert("Erro ao carregar dados do cliente.")
        })
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const clientData = {
      name: inputName.current.value,
      email: inputEmail.current.value,
      phone: inputPhone.current.value,
    }

    try {
      if (id) {
        await api.put(`/clients/${id}/`, clientData)
      } else {
        await api.post('/clients/', clientData)
      }
      toast.success("Cliente salvo com sucesso!", {hideProgressBar: true})
      setTimeout(() => navigate('/clients'), 1800)
    } catch (error) {
      toast.error("Não foi possível executar a ação!")
    }
  }

  return (
    <Layout>
      <h2 className='text-center mb-5'>{id ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text">Nome:</span>
          <input name="name" type="text" className="form-control" ref={inputName} required />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Email:</span>
          <input name="email" type="email" className="form-control" ref={inputEmail} required />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Telefone:</span>
          <input name="phone" type="text" className="form-control" ref={inputPhone} required />
        </div>

        <div className='d-flex justify-content-end'>
          <button type="submit" className="btn btn-primary">
            {id ? 'Salvar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default FormClient
