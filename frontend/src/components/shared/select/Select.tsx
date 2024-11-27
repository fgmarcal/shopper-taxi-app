import React from "react";
import { SelectType } from "./types";


export const Select:React.FC<SelectType> = ({onChange, drivers}) =>{

    return (
        <>
            <select onChange={onChange} style={{ padding: '0.5rem', fontSize: '1rem' }}>
            <option value="">Todos os motoristas</option>
            {drivers.map(driver => (
                <option key={driver.id} value={driver.id}>{driver.name}</option>
            ))}
            </select>
        </>
    )
}