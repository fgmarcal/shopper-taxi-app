import React, { useEffect, useState } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { RideRepository } from "../../../repository/ride/RideRepository";
import { estimateRide } from "../../../entity/ride/estimateRide";
import { mapContainer } from "./style";
import { estimateResponse } from "../../../entity/ride/estimateResponse";


const rideRepository = new RideRepository();

const defaultCenter = {
    //Localização de São Paulo
    lat:-23.59148176827035,
    lng:-46.67912328149004
}

export const GoogleMap: React.FC<estimateRide> = (ride:estimateRide) => {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const map = useMap();

useEffect(() => {
    const fetchRoute = async () => {
    try {
        const response:estimateResponse = await rideRepository.estimate(ride);
        if (!response.origin || !response.destination) {
        console.error("Origem ou Destino não selecionado");
        return;
    }
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
    {
        origin: { lat: response.origin.latitude, lng: response.origin.longitude },
        destination: { lat: response.destination.latitude, lng: response.destination.longitude },
        travelMode: google.maps.TravelMode.DRIVING, // Ajuste para o modo de viagem desejado
    },
    (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
        } else {
        console.error("Erro ao obter rota:", status);
        }
    });
    } catch (error) {
        console.error("Erro ao chamar a API do backend:", error);
    }
};

    fetchRoute();
}, []);

useEffect(() => {
    if (map && directions) {
        const directionsRenderer = new google.maps.DirectionsRenderer({
        directions,
        map,
        markerOptions:{
            clickable:false,
            draggable:false,
            optimized:true,
            opacity:0.7,
        },
        suppressMarkers: false,
        preserveViewport: false,
        polylineOptions:{
            clickable:false,
            strokeColor:"#FF0000",
            draggable:false,
            strokeOpacity:0.6
        },
    });
    directionsRenderer.setDirections(directions);

    }
}, [map, directions]);

return (
    <>
    <div style={mapContainer}>
        <Map
            defaultCenter={defaultCenter}
            zoom={directions ? undefined : 9}
            disableDefaultUI
            disableDoubleClickZoom
            clickableIcons={false}
            cameraControl={false}
        />
    </div>
    </>
    );
};
