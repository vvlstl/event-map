import L from "leaflet";

export type TMarker = {
    lat: number;
    lng: number;
    options?: L.MarkerOptions;
}