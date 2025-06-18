import Logo from '../assets/logo-transparente.png'
import '../components/Components.css'

const Layout = ({ children }) => {
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="container-fluid">
                    <img src={Logo} className='logo' alt="Logo Organize.me"/>
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
            </div>
        </>
    )
}

export default Layout