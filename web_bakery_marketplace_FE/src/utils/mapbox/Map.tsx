import { useState } from 'react';
import ReactMapGL, { GeolocateControl, NavigationControl, Marker } from 'react-map-gl';
import { Input } from 'antd';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface MapProps {
    address: string;
}

const Map: React.FC<MapProps> = ({ address }) => {
    const [viewport, setViewport] = useState({
        latitude: 10.7769, // Tọa độ latitude của thành phố Hồ Chí Minh
        longitude: 106.7009, // Tọa độ longitude của thành phố Hồ Chí Minh
        zoom: 10
    });

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };
    return (
        <>
            <Input.Search
                placeholder="Search for a location"
                onSearch={handleSearch}
                style={{ marginBottom: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ReactMapGL
                {...viewport}
                style={{ width: '100%', height: '220px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string}
                onMove={(evt) => setViewport(evt.viewState)}
            >
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />
                <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
                    <FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />
                </Marker>
            </ReactMapGL></>
    );
}

export default Map;
