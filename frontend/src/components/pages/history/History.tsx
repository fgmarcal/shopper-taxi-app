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
        <p style={{margin:"0 1rem"}}><strong>Id do usuário: </strong>{customerId}</p>
        <Select onChange={(e)=> handleDriverFilter(e)} drivers={drivers}/>
        <Link to={'/trip'} style={{ color: '#FFF', fontWeight: 900 , margin:"0 0"}}>Fazer uma nova viagem</Link>
      </div>

      <div style={{ width: "100%", margin: "2rem auto" }}>
            {history && history.rides.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" , alignItems:"self-start", justifyContent:'center'}}>
                    {history.rides.map((ride: Ride) => (
                        <div
                            key={ride.id}
                            style={{
                                padding: "1rem"
                            }}
                        >
                            <p>
                                <strong>Data e Hora:</strong> {new Date(ride.date).toLocaleString()}
                            </p>
                            <p>
                                <strong>Motorista:</strong> {ride.driver.name}
                            </p>
                            <p>
                                <strong>Origem:</strong> {ride.origin}
                            </p>
                            <p>
                                <strong>Destino:</strong> {ride.destination}
                            </p>
                            <p>
                                <strong>Distância (km):</strong>{" "}
                                {(ride.distance / 1000).toFixed(2).replace(".", ",")}
                            </p>
                            <p>
                                <strong>Tempo:</strong> {ride.duration}
                            </p>
                            <p>
                                <strong>Valor:</strong> R$ {ride.value.toFixed(2).replace(".", ",")}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: "center" }}>Nenhuma viagem encontrada.</p>
            )}
        </div>
    </>
  );
}
