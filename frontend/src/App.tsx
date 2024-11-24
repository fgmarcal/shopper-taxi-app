import React from 'react'
import './index.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GoogleMap } from './components/shared/map/Map';


export const App:React.FC = () => {
  const API_KEY = String(process.env.GOOGLE_API_KEY);

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <GoogleMap />
      </APIProvider>
    </>
  )
}
