import { useState, useEffect } from 'react';
import ReactMapGL, { GeolocateControl, NavigationControl, Marker, Popup } from 'react-map-gl';
import { FaShoppingCart } from 'react-icons/fa';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface Bakery {
    _id: string;
    name: string;
    address: string;
    rating: number;
    latitude?: number;
    longitude?: number;
}

interface MapProps {
    bakeries: Bakery[];
}

const Map: React.FC<MapProps> = ({ bakeries }) => {
    const [viewport, setViewport] = useState({
        latitude: 10.7769,
        longitude: 106.7009,
        zoom: 10
    });

    const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null);
    const [geocodedBakeries, setGeocodedBakeries] = useState<Bakery[]>([]);

    const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
        const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        const url = `${endpoint}?access_token=${accessToken}`;

        // console.log('url', url);

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const [longitude, latitude] = data.features[0].center;
                return [latitude, longitude];
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
        return null;
    };

    useEffect(() => {
        const updateBakeriesWithCoordinates = async () => {
            const updatedBakeries = await Promise.all(
                bakeries.map(async (bakery) => {
                    if (!bakery.latitude || !bakery.longitude) {
                        const coordinates = await geocodeAddress(bakery.address);
                        if (coordinates) {
                            return { ...bakery, latitude: coordinates[0], longitude: coordinates[1] };
                        }
                    }
                    return bakery;
                })
            );
            console.log('updatedBakeries', updatedBakeries);
            setGeocodedBakeries(updatedBakeries);
        };

        updateBakeriesWithCoordinates();
    }, [bakeries]);

    return (
        <ReactMapGL
            {...viewport}
            style={{ width: '100%', height: '250px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string}
            onMove={(evt) => setViewport(evt.viewState)}
        >
            <GeolocateControl position="top-left" />
            <NavigationControl position="top-left" />
            {geocodedBakeries.map((bakery) => (
                bakery.latitude && bakery.longitude && (
                    <Marker
                        key={bakery._id}
                        latitude={bakery.latitude}
                        longitude={bakery.longitude}
                        onClick={() => setSelectedBakery(bakery)}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <FaShoppingCart style={{ color: 'red', fontSize: '24px' }} />
                            <div style={{
                                backgroundColor: 'HighlightText',
                                padding: '2px 4px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                            }}>
                                {bakery.name}
                            </div>
                        </div>
                    </Marker>
                )
            ))}

            {selectedBakery && selectedBakery.latitude && selectedBakery.longitude && (
                <Popup
                    latitude={selectedBakery.latitude}
                    longitude={selectedBakery.longitude}
                    onClose={() => setSelectedBakery(null)}
                    closeOnClick={false}
                >
                    <div style={{ padding: '10px', maxWidth: '200px' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{selectedBakery.name}</h3>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Đc:</strong> {selectedBakery.address}
                        </p>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Đánh giá:</strong> {selectedBakery.rating >= 0 ? selectedBakery.rating.toFixed(1) : 'N/A'} ⭐
                        </p>
                    </div>
                </Popup>
            )}
        </ReactMapGL>
    );
}

export default Map;