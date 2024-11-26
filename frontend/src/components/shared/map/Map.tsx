import React, { useEffect, useState } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { mapContainer } from "./style";
import { mapRender } from "./types";



const defaultCenter = {
    //Localização de São Paulo
    lat:-23.59148176827035,
    lng:-46.67912328149004
}

export const GoogleMap: React.FC<mapRender> = (ride) => {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [center, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

    const map = useMap();

useEffect(() => {
    if (!ride.origin || !ride.destination) {
        console.error("Origem ou Destino não selecionado");
        return;
    }
    const fetchRoute = async () => {
    try {
        
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
    {
        origin: { lat: ride.origin.latitude, lng: ride.origin.longitude },
        destination: { lat: ride.destination.latitude, lng: ride.destination.longitude },
        travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
        const bounds = result?.routes[0].bounds;
        const center = bounds?.getCenter();
        if(center)
            setMapCenter({ lat: center?.lat(), lng: center?.lng() }); 
        } else {
        console.error("Erro ao obter rota:", status);
        }
    });
    } catch (error) {
        console.error("Erro ao chamar a API do backend:", error);
    }
};

    fetchRoute();
}, [ride]);

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
            center={center}
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
