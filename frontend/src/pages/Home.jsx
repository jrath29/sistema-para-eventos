import Layout from '../components/Layout'
import './Pages.css'
import Events from '../assets/event.jpg'
import Clients from '../assets/clients.jpg'
import Enrollments from '../assets/enrollments.jpg'

const Home = () => {
    return (
        <Layout>
            <h2 className='text-center'>Bem vindo ao Organize.me</h2>
            <p className='text-center'>Aqui você pode adicionar eventos, cadastrar pessoas e inscrevê-las nos eventos.</p>

            <div className='cards mt-5'>
                <div className="card">
                    <img src={Events} class="card-img-top" alt="Events"/>
                    <div className="card-body text-center">
                        <h5 className="card-title">Eventos</h5> <hr/>
                        <p className="card-text">Gerencie e acompanhe todos os eventos cadastrados no sistema.</p>
                        <a href="/events" className="btn btn-primary">Ver eventos</a>
                    </div>
                </div>

                <div className="card">
                    <img src={Clients} class="card-img-top" alt="Clients"/>
                    <div className="card-body text-center">
                        <h5 className="card-title">Clientes</h5> <hr/>
                        <p className="card-text">Cadastre, edite e visualize os participantes dos eventos.</p>
                        <a href="/clients" className="btn btn-outline-primary">Ver clientes</a>
                    </div>
                </div>

                <div className="card">
                    <img src={Enrollments} class="card-img-top" alt="Enrollments"/>
                    <div className="card-body text-center">
                        <h5 className="card-title">Inscrições</h5> <hr/>
                        <p className="card-text">Gerencie as inscrições dos clientes nos eventos disponíveis.</p>
                        <a href="/enrollments" className="btn btn-primary">Ver inscrições</a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home