import Logo from '../assets/logo-transparent.png'
import '../components/Components.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="container-fluid">
                    <a href='/'>
                        <img src={Logo} className='logo' alt="Logo Organize.me"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/events">Eventos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/clients">Clientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/enrollments">Inscrições</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                { children }
                <ToastContainer theme="colored"/>
            </div>
        </>
    )
}

export default Layout