import React, { useEffect } from 'react'
import { ConfirmationType } from './types';

export const Confirmation:React.FC<ConfirmationType> = ({drivers}:ConfirmationType) => {

    useEffect(() => {
        if (!drivers || drivers.length === 0) return;
        const fetchOptions = () => {
            console.log("Fetching driver options...");
        };
        fetchOptions();
    }, [drivers]);

    return (
        <div>
            {drivers && drivers.length > 0 ? (
                drivers.map((driver) => (
                    <div key={driver.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '5px' }}>
                        <p><strong>Nome:</strong> {driver.name}</p>
                        <p><strong>Descrição:</strong> {driver.description}</p>
                        <p><strong>Veículo:</strong> {driver.vehicle}</p>
                        
                        {driver.review && driver.review.length > 0 ? (
                            <>
                                <p><strong>Avaliação:</strong> {(Math.min(driver.review[0].rating, 5))} / 5</p>
                                <p><strong>Comentário:</strong> {driver.review[0].comment || 'Sem comentários'}</p>
                            </>
                        ) : (
                            <p><strong>Avaliação:</strong> Não avaliado</p>
                        )}
    
                        <p><strong>Valor:</strong> R$ {driver.value.toFixed(2)}</p>
                        <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
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
