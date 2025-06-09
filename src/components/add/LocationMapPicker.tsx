'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMapPin, FiSearch, FiNavigation, FiRefreshCw, FiCheck } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import styles from '../../app/app/add/styles.module.css';

// Importação dinâmica do React Leaflet para evitar problemas de SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => ({ default: mod.MapContainer })), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => ({ default: mod.TileLayer })), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => ({ default: mod.Marker })), { ssr: false });

// Importação dinâmica do componente MapEvents
const DynamicMapEvents = dynamic(
  () => import('react-leaflet').then(mod => {
    const { useMapEvents } = mod;
    
    return {
      default: ({ onLocationSelect }: { onLocationSelect: (location: LocationData) => void }) => {
        const map = useMapEvents({
          click: async (e: any) => {
            const { lat, lng } = e.latlng;
            
            // Geocoding reverso (converter coordenadas para endereço)
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
              );
              const data = await response.json();
              
              const location: LocationData = {
                address: data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
                coordinates: { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) },
                city: data.address?.city || data.address?.town || data.address?.village || 'Localização',
                country: data.address?.country || 'Portugal'
              };
              
              onLocationSelect(location);
            } catch (error) {
              console.error('Erro no geocoding:', error);
              
              const location: LocationData = {
                address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
                coordinates: { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) },
                city: 'Localização',
                country: 'Portugal'
              };
              
              onLocationSelect(location);
            }
          },
        });
        
        return null;
      }
    };
  }),
  { ssr: false }
);

interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  city: string;
  country: string;
}

interface LocationMapPickerProps {
  onLocationSelect: (location: LocationData) => void;
  initialLocation?: LocationData;
}

const LocationMapPicker: React.FC<LocationMapPickerProps> = ({
  onLocationSelect,
  initialLocation
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(initialLocation || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([38.7223, -9.1393]); // Lisboa
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Fix para ícones do Leaflet
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setMapCenter([location.coordinates.lat, location.coordinates.lng]);
    onLocationSelect(location);
  };

  // Obter localização atual do usuário
  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Geocoding reverso para obter endereço
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
        );
        const data = await response.json();
        
        const location: LocationData = {
          address: data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          coordinates: { lat: latitude, lng: longitude },
          city: data.address?.city || data.address?.town || 'Localização Atual',
          country: data.address?.country || 'Portugal'
        };
        
        handleLocationSelect(location);
      } catch (error) {
        const location: LocationData = {
          address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          coordinates: { lat: latitude, lng: longitude },
          city: 'Localização Atual',
          country: 'Portugal'
        };
        
        handleLocationSelect(location);
      }
      
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Buscar localização
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const result = data[0];
        const location: LocationData = {
          address: result.display_name,
          coordinates: { lat: parseFloat(result.lat), lng: parseFloat(result.lon) },
          city: result.address?.city || result.address?.town || result.address?.village || 'Localização',
          country: result.address?.country || 'Portugal'
        };
        
        handleLocationSelect(location);
      } else {
        alert('Localização não encontrada. Tente outro termo de busca.');
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      alert('Erro ao buscar localização. Tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div 
      className={`${styles.formSection} rounded-2xl p-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${styles.sectionHeader} mb-6`}>
        <FiMapPin className={styles.sectionIcon} size={24} />
        <h2 className="text-lg font-semibold">Localização</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <motion.input
              type="text"
              placeholder="Buscar endereço ou cidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${styles.searchLocation} w-full pl-10 pr-4 py-3 rounded-xl`}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              whileFocus={{ scale: 1.01 }}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <motion.button
            type="button"
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSearching ? (
              <FiRefreshCw className={`${styles.loadingSpinner}`} size={20} />
            ) : (
              <FiSearch size={20} />
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className={`${styles.locationButton} px-4 py-3 rounded-xl disabled:opacity-50`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title="Usar minha localização"
          >
            {isGettingLocation ? (
              <FiRefreshCw className={`${styles.loadingSpinner}`} size={20} />
            ) : (
              <FiNavigation size={20} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Map Container */}
      <div className={`${styles.mapContainer} rounded-xl overflow-hidden h-64`}>
        {isClient ? (
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            key={`${mapCenter[0]}-${mapCenter[1]}`}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {selectedLocation && (
              <Marker position={[selectedLocation.coordinates.lat, selectedLocation.coordinates.lng]} />
            )}
            
            <DynamicMapEvents onLocationSelect={handleLocationSelect} />
          </MapContainer>
        ) : (
          <div className="h-full w-full bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-gray-500">Carregando mapa...</div>
          </div>
        )}
      </div>

      {/* Selected Location Info */}
      {selectedLocation && (
        <motion.div 
          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FiCheck className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-green-800 mb-1">Localização Selecionada</div>
              <div className="text-sm text-green-700 mb-2">{selectedLocation.address}</div>
              <div className="text-xs text-green-600">
                Coordenadas: {selectedLocation.coordinates.lat.toFixed(6)}, {selectedLocation.coordinates.lng.toFixed(6)}
              </div>
              <div className="text-xs text-green-600">
                {selectedLocation.city}, {selectedLocation.country}
              </div>
            </div>
          </div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default LocationMapPicker;
