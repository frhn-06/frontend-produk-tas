// "use client"

// import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
// import dynamic from "next/dynamic";
// import { useState } from "react";

// interface TypeProps {
//   value?: [number, number];
//   onChange?: (value: [number, number]) => void;
// }

// function LocationMarker({ value, onChange }: TypeProps) {
//   const [position, setPosition] = useState<[number, number] | null>(value ?? null);

//   useMapEvents({
//     click(e) {
//       const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];

//       setPosition(newPosition);

//       onChange?.(newPosition);
//     }
//   });

//   return position === null ? null : <Marker position={position} />;
// }

// const MapPicker = (props: TypeProps) => {
//     const {
//       value,
//       onChange
//     } = props

//     return (
//         <MapContainer center={value ?? [-6.200000, 106.816666]} zoom={10} scrollWheelZoom={false} className="h-40 lg:h-60 w-full">
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={[51.505, -0.09]}>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//           <LocationMarker value={value} onChange={onChange} />
//         </MapContainer>
//     )
// }

// export default MapPicker;