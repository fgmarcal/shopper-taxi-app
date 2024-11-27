import React from 'react'
import { ConfirmationType } from './types';
import { DriverOption } from '../../../entity/ride/estimateResponse';
import { useNavigate } from 'react-router';
import { confirmRide } from '../../../entity/ride/confirmRide';
import { RideRepository } from '../../../repository/ride/RideRepository';
import { useAppContext } from '../../../hooks/useAppContext';
import { notifyError, notifySuccess } from '../popMessage/PopMessage';
import { Button } from 'antd';

const rideRepository = new RideRepository();

export const Confirmation:React.FC<ConfirmationType> = ({estimate}) => {

    const navigate = useNavigate();
    const {customerId, originContext, destinationContext} = useAppContext();


    const handleConfirmation = async (driver: DriverOption): Promise<void> => {
        const rideConfirmation: confirmRide = {
            customer_id: customerId,
            origin: originContext,
            destination: destinationContext,
            distance: estimate.distance,
            duration: estimate.duration,
            driver: {
                id: driver.id,
                name: driver.name,
            },
            value: driver.value,
        };

        try {
            await rideRepository.confirm(rideConfirmation);
            notifySuccess("Viagem cadastrada com sucesso!");
            navigate('/history');
        } catch (error) {
            console.error(error);
            notifyError("Houve um erro ao confirmar a viagem. Tente novamente mais tarde!");
        }
    };
    return (
        <div>
            {estimate?.options && estimate.options.length > 0 ? (
                estimate.options.map((driver) => (
                    <div 
                        key={driver.id} 
                        style={{ 
                            border: '1px solid #ddd', 
                            padding: '1rem', 
                            marginBottom: '1rem', 
                            borderRadius: '0.3125rem'
                        }}
                    >
                        <p><strong>Nome do Motorista:</strong> {driver.name}</p>
                        <p><strong>Descrição:</strong> {driver.description}</p>
                        <p><strong>Veículo:</strong> {driver.vehicle}</p>
                        
                        {driver.review && driver.review.length > 0 ? (
                            <div style={{
                                border: '1px solid #ccc',
                                borderRadius: '0.3125rem',
                                padding: '0.5rem',
                                marginTop: '0.5rem',
                                maxHeight: driver.review.length > 1 ? '9.375rem' : 'none',
                                overflowY: driver.review.length > 1 ? 'auto' : 'visible',
                            }}>
                                <p><strong>Avaliações:</strong></p>
                                {driver.review.map((rev, index) => (
                                    <div 
                                        key={index} 
                                        style={{ 
                                            borderBottom: '1px solid #eee', 
                                            paddingBottom: '0.5rem',
                                            marginBottom: '0.5rem' 
                                        }}
                                    >
                                        <p><strong>Nota:</strong> {(Math.min(rev.rating, 5)).toFixed(0)} / 5</p>
                                        <p><strong>Comentário:</strong> {rev.comment || 'Sem comentários'}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p><strong>Avaliações:</strong> Não avaliado</p>
                        )}
    
                        <p><strong>Valor:</strong> R$ {driver.value.toFixed(2).replace('.', ',')}</p>
                        <Button 
                            style={{ 
                                fontWeight:900
                            }}
                            onClick={() => handleConfirmation(driver)}
                            type='primary'
                            
                        >
                            Vou com este!
                        </Button>
                    </div>
                ))
            ) : (
                <p>Nenhum motorista disponível</p>
            )}
        </div>
    );
    
    
}
