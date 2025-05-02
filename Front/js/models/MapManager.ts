import Leaflet from "leaflet";
import {TMarker} from "~/types/TMarker";

export class MapManager {
    private readonly map: Leaflet.Map;
    protected markers: Leaflet.Marker[] = [];

    constructor(containerId: string) {
        this.map = Leaflet.map(containerId).setView([53.3481, 83.7796], 13);

        Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri Satellite',
            maxZoom: 19
        }).addTo(this.map);
    }

    addMarker(lat: number, lng: number, options?: Leaflet.MarkerOptions): Leaflet.Marker {
        const marker = Leaflet.marker([lat, lng], options).addTo(this.map);
        this.markers.push(marker);
        return marker;
    }

    addMarkers(
        markersData: Array<TMarker>
    ): Leaflet.Marker[] {
        return markersData.map(marker => {
            const createdMarker = this.addMarker(
                marker.lat,
                marker.lng,
                marker.options
            );

            if (marker.options?.popupContent) {
                createdMarker.bindPopup(marker.options.popupContent);
            }

            return createdMarker;
        });
    }
}