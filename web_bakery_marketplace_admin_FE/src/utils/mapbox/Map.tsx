import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

interface MapProps {
    address: string;
}

const Map: React.FC<MapProps> = ({ address }) => {
    const [viewport, setViewport] = useState({
        latitude: 10.7769,
        longitude: 106.7009,
        zoom: 12
    });

    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (address) {
            geocodeAddress(address);
        }
    }, [address]);

    const geocodeAddress = async (address: string) => {
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`, {
                params: {
                    access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
                    country: 'VN',
                    limit: 1
                }
            });

            if (response.data.features && response.data.features.length > 0) {
                const [longitude, latitude] = response.data.features[0].center;
                setViewport(prev => ({
                    ...prev,
                    latitude,
                    longitude,
                    zoom: 15
                }));
                setMarker({ latitude, longitude });
            }
        } catch (error) {
            console.error('Error geocoding address:', error);
        }
    };

    return (
        <>
            <ReactMapGL
                {...viewport}
                style={{ width: '100%', height: '220px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string}
                onMove={(evt) => setViewport(evt.viewState)}
            >
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />
                {marker && (
                    <Marker latitude={marker.latitude} longitude={marker.longitude}>
                        <FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />
                    </Marker>
                )}
            </ReactMapGL>
        </>
    );
}

export default Map;