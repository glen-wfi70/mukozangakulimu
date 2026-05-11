import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Country {
  name: string;
  lat: number;
  lng: number;
  highlighted?: boolean;
  projects?: string[];
}

const WorldGlobe: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const countries: Country[] = [
    { name: 'Uganda', lat: 1.3733, lng: 32.2903, highlighted: true, projects: ['School Construction', 'Water Supply'] },
    { name: 'Kenya', lat: -0.0236, lng: 37.9062, projects: ['Road Construction'] },
    { name: 'Tanzania', lat: -6.3690, lng: 34.8888, projects: ['Healthcare Center'] },
    { name: 'Rwanda', lat: -1.9403, lng: 29.8739, projects: ['Solar Power'] },
    { name: 'Burundi', lat: -3.3731, lng: 29.9189, projects: ['Agricultural Project'] },
    { name: 'DRC', lat: -4.0383, lng: 21.7587, projects: ['Mining Infrastructure'] },
    { name: 'Ethiopia', lat: 9.1450, lng: 40.4897, projects: ['Irrigation System'] },
    { name: 'South Sudan', lat: 6.8770, lng: 31.3070, projects: ['Education Initiative'] },
  ];

  // Fix Leaflet default marker icon issue
  useEffect(() => {
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const createCustomIcon = (highlighted: boolean) => {
    return new Icon({
      iconUrl: highlighted 
        ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjZmY2YjM1IiBzdHJva2U9IiNkODQzMTUiIHN0cm9rZS13aWR0aD0iMSIgZD0iTTEyLjUgMEMxMi41IDAgMCA2LjI1IDAgMTIuNUMwIDE4Ljc1IDEyLjUgNDEgMTIuNSA0MVMyNSAxOC43NSAyNSAxMi41QzI1IDYuMjUgMTIuNSAwIDEyLjUgMHoiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIuNSIgcj0iNCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=='
        : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjNjZiYjZhIiBzdHJva2U9IiMzOGUzYyIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMTIuNSAwQzEyLjUgMCAwIDYuMjUgMCAxMi41QzAgMTguNzUgMTIuNSA0MSAxMi41IDQxUzI1IDE4Ljc1IDI1IDEyLjVDMjUgNi4yNSAxMi41IDAgMTIuNSAweiIvPjxjaXJjbGUgY3g9IjEyLjUiIGN5PSIxMi41IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  // Focus on East Africa region
  const bounds = new LatLngBounds([
    [-12, 15], // Southwest corner
    [15, 50]   // Northeast corner
  ]);

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: 'rgba(249, 249, 249, 0.95)',
      borderRadius: '8px',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '15px 20px',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          🌍 Mukozangakulimu World Map - Uganda & East Africa Projects
        </div>
        
        <div style={{ height: '500px', width: '100%' }}>
          <MapContainer
            center={[1.3733, 32.2903]} // Center on Uganda
            zoom={6}
            bounds={bounds}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Highlight Uganda with a circle */}
            <Circle
              center={[1.3733, 32.2903]}
              radius={200000} // 200km radius
              pathOptions={{
                color: '#ff6b35',
                fillColor: '#ff6b35',
                fillOpacity: 0.2,
                weight: 3
              }}
            />
            
            {/* Add markers for each country */}
            {countries.map((country) => (
              <Marker
                key={country.name}
                position={[country.lat, country.lng]}
                icon={createCustomIcon(country.highlighted || false)}
                eventHandlers={{
                  click: () => setSelectedCountry(country),
                  mouseover: (e) => {
                    e.target.setZIndexOffset(1000);
                    e.target._icon.style.transform = 'scale(1.2)';
                    e.target._icon.style.transition = 'transform 0.3s ease';
                  },
                  mouseout: (e) => {
                    e.target.setZIndexOffset(0);
                    e.target._icon.style.transform = 'scale(1)';
                  }
                }}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <h3 style={{ 
                      margin: '0 0 10px 0', 
                      color: country.highlighted ? '#ff6b35' : '#333',
                      fontSize: '16px'
                    }}>
                      {country.name}
                    </h3>
                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                      <strong>Coordinates:</strong> {country.lat.toFixed(4)}, {country.lng.toFixed(4)}
                    </p>
                    {country.projects && country.projects.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <strong style={{ fontSize: '12px', color: '#333' }}>Active Projects:</strong>
                        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                          {country.projects.map((project, index) => (
                            <li key={index} style={{ fontSize: '11px', color: '#555', margin: '2px 0' }}>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {country.highlighted && (
                      <div style={{
                        marginTop: '10px',
                        padding: '5px',
                        backgroundColor: '#fff3e0',
                        borderRadius: '3px',
                        fontSize: '11px',
                        color: '#e65100'
                      }}>
                        ⭐ Priority Country - Uganda
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div style={{
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Map Instructions:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
          <li>📍 Click on any marker to view country details and active projects</li>
          <li>🟠 Uganda is highlighted with an orange circle and special marker</li>
          <li>🗺️ Use mouse to pan and scroll to zoom in/out</li>
          <li>📋 Projects are connected to specific countries for better tracking</li>
        </ul>
      </div>
      
      {selectedCountry && (
        <div style={{
          marginTop: '15px',
          padding: '15px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #c3e6c3'
        }}>
          <strong>Currently Selected:</strong> {selectedCountry.name}
          {selectedCountry.projects && (
            <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>
              ({selectedCountry.projects.length} active project{selectedCountry.projects.length !== 1 ? 's' : ''})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default WorldGlobe;
