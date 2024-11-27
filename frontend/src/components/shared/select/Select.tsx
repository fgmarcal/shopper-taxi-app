import React from "react";
import { SelectType } from "./types";
import { OptionsStyles, SelecStyles } from "./styles";



export const Select:React.FC<SelectType> = ({onChange, drivers}) =>{

    return (
        <>
            <select onChange={onChange} style={SelecStyles}>
            <option value="" style={OptionsStyles}>Todos os motoristas</option>
            {drivers.map(driver => (
                <option key={driver.id} value={driver.id}>{driver.name}</option>
            ))}
            </select>
        </>
    )
}