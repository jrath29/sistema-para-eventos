import Layout from '../components/Layout'
import './Pages.css'

const Home = () => {
    return (
        <Layout>
            <h2 className='text-center'>Bem vindo ao Organize.me</h2>
            <p className='text-center'>Aqui você pode adicionar eventos, cadastrar pessoas e inscrevê-las nos eventos.</p>
        </Layout>
    )
}

export default Home