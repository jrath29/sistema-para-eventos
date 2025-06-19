import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Clients from '../pages/Clients'
import Events from '../pages/Events'
import FormClient from '../components/FormClient'
import FormEvent from '../components/FormEvent'
import Enrollments from '../pages/Enrollments'

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/events' element={<Events/>}/>
            <Route exact path='/event/create' element={<FormEvent/>}/>
            <Route exact path='/event/:id' element={<FormEvent/>}/>
            <Route exact path='/clients' element={<Clients/>}/>
            <Route exact path='/client/create' element={<FormClient/>}/>
            <Route exact path='/client/:id' element={<FormClient/>}/>
            <Route exact path='/enrollments' element={<Enrollments/>}/>
        </Routes>
    </BrowserRouter>
)

export default AppRoutes