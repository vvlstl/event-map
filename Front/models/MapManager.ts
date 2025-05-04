import L from "leaflet";
import {TMarker} from "~/types/TMarker";
import EventBus from "~/js/helper/event-bus";
import {TEventCard} from "~/types/TEventCard";
import {show} from "~/js/controllers/popup";

export class MapManager {
    private readonly map: L.Map;
    protected markers: L.Marker[] = [];

    constructor(containerId: string) {
        this.map = L.map(containerId).setView([53.3481, 83.7796], 13);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri Satellite',
            maxZoom: 19
        }).addTo(this.map);

        // Обработка клика по карте
        this.map.on('click', (e: L.LeafletMouseEvent) => {
            EventBus.emit('click-to-map', {
                latlng: e.latlng,
            });
        });
    }

    addMarker(lat: number, lng: number, options?: L.MarkerOptions): L.Marker {
        const marker = L.marker([lat, lng], options).addTo(this.map);

        // Добавляем обработчик клика по маркеру
        marker.on('click', (e: L.LeafletMouseEvent) => {
            EventBus.emit('click-to-marker', {
                latlng: e.latlng,
            });
        });

        this.markers.push(marker);
        return marker;
    }

    addMarkers(markersData: Array<TMarker>): L.Marker[] {
        return markersData.map(marker => {
            return this.addMarker(
                marker.lat,
                marker.lng,
                marker.options
            );
        });
    }

    showPopupAt(latlng: L.LatLng, content: string) {
        L.popup()
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this.map);
    }

    onMarkerClick(latlng: L.LatLng, content: TEventCard) {
        show('event', {
            title: content.name,
            text: content.description,
            picture: content.picture,
        });
    }
}