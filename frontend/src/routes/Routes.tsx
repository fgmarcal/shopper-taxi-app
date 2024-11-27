import React from 'react'
import { BrowserRouter, Navigate, Routes as ReactRouter, Route } from 'react-router'
import { Home } from '../components/pages/home/Home'
import { Trip } from '../components/pages/trip/Trip'
import { History } from '../components/pages/history/History'
import { Register } from '../components/pages/register/Register'
import { useAppContext } from '../hooks/useAppContext'

export const Routes:React.FC = () => {

  const {signed} = useAppContext();

  const ForbiddenAcces:React.FC =()=>{
    return (<Navigate to='/' />)
}

  return (

    <BrowserRouter>
        <ReactRouter>
            <Route path={'/'} element={<Home />} />
            <Route path={'/home'} element={<Home />} />

            <Route path={'/register'} element={<Register />}/>
            <Route path={'/trip'} element={signed? <Trip /> : <ForbiddenAcces />} />
            
            <Route path={'/history'} element={signed? <History /> : <ForbiddenAcces />} />
        </ReactRouter>
    </BrowserRouter>

  )
}
