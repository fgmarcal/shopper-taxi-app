import React, { useEffect, useState } from 'react'
import { ConfirmationType } from './types';
import { DriverOption } from '../../../entity/ride/estimateResponse';

export const Confirmation:React.FC<ConfirmationType> = ({estimate}) => {

    const [selectedDriver, setSelectedDriver] = useState<DriverOption | null>(null);


    useEffect(() => {
        if (!estimate || !estimate.options ||estimate.options.length === 0) return;
        const fetchOptions = () => {
            console.log("Fetching driver options...");
        };
        fetchOptions();
    }, [estimate]);


    const handleSelectDriver = (driver: DriverOption) => {
        setSelectedDriver(driver);
        console.log("Motorista selecionado:", driver);
    };

    useEffect(()=>{
        if(!selectedDriver) return;
        
    },[selectedDriver])

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
                        <p><strong>Nome:</strong> {driver.name}</p>
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
                        <button 
                            style={{ 
                                backgroundColor: '#007bff', 
                                color: '#fff', 
                                padding: '0.5rem 1rem', 
                                border: 'none', 
                                borderRadius: '0.1875rem', 
                                cursor: 'pointer' 
                            }}
                            onClick={() => handleSelectDriver(driver)}
                        >
                            Vou com este!
                        </button>
                    </div>
                ))
            ) : (
                <p>Nenhum motorista disponível</p>
            )}
        </div>
    );
    
    
}
