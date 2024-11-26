import React from 'react'
import './index.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Routes } from './routes/Routes';
import { AuthProvider } from './context/authContext';


export const App:React.FC = () => {
  const API_KEY = String(process.env.GOOGLE_API_KEY);

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </APIProvider>
    </>
  )
}
