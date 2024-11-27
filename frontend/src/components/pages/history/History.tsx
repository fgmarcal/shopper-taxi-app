import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../hooks/useAppContext'
import { Link } from 'react-router';
import { getRideResponse, Ride } from '../../../entity/ride/getRidesResponse';
import { RideRepository } from '../../../repository/ride/RideRepository';
import { DriverRepository } from '../../../repository/driver/DriverRepository';
import { getRides } from '../../../entity/ride/getRides';
import { notifyError } from '../../shared/popMessage/PopMessage';
import { Select } from '../../shared/select/Select';

const rideRepository = new RideRepository();
const driverRepository = new DriverRepository();

export const History:React.FC = () => {

  const { customerId, customerName } = useAppContext();
  const [history, setHistory] = useState<getRideResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [drivers, setDrivers] = useState<{ id: number, name: string }[]>([]);


  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const result = await driverRepository.getAll();
        if (result) {
          setDrivers(result);
        }
      } catch (error) {
        console.error('Erro ao carregar motoristas:', error);
      }
    };

    fetchDrivers();
  }, []);



  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const params:getRides = { customer_id: customerId };
        if (driverId !== null) {
          params['driver_id'] = driverId;
        }
        const result = await rideRepository.get(params);
        if (result) {
          setHistory(result);
        }
      } catch (error) {
        notifyError('Ops! Nenhuma viagem com este motorista!');
        setHistory(null)
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [customerId, driverId]);

  const handleDriverFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDriverId = event.target.value ? parseInt(event.target.value) : null;
    setDriverId(selectedDriverId);
  };


  if (loading) {
    return <div>Carregando...</div>;
  }


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '2rem 0' }}>
        <h1 style={{ fontWeight: 900, fontSize: '5rem' }}>Seu histórico de viagens, {customerName}</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: '2rem 2rem' }}>
        <p><strong>Id do usuário: </strong>{customerId}</p>
        <Link to={'/trip'} style={{ color: '#FFF', fontWeight: 900 }}>Fazer uma nova viagem</Link>
      </div>
       <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '1rem' }}>

        <Select onChange={(e)=> handleDriverFilter(e)} drivers={drivers}/>

      </div>
      <div style={{ width: '90%', overflowX: 'auto', display: 'flex', justifyContent: 'center', marginTop: '2rem', alignItems:'center' }}>
        {history && history.rides.length > 0 ? (
          <table style={{ width: '80%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Data e Hora</th>
                <th>Motorista</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Distância (km)</th>
                <th>Tempo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {history.rides.map((ride: Ride) => (
                <tr key={ride.id}>
                  <td>{new Date(ride.date).toLocaleString()}</td>
                  <td>{ride.driver.name}</td>
                  <td>{ride.origin}</td>
                  <td>{ride.destination}</td>
                  <td>{(ride.distance/1000).toFixed(2).replace('.',',')}</td>
                  <td>{ride.duration}</td>
                  <td>R$ {ride.value.toFixed(2).replace('.',',')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma viagem encontrada.</p>
        )}
      </div>
    </>
  );
}
