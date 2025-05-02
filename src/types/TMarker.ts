import Leaflet from "leaflet";

export type TMarker = {
    lat: number;
    lng: number;
    options?: Leaflet.MarkerOptions & {
        popupContent?: string;
        iconUrl?: string;
    };
}