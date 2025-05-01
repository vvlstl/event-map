import Leaflet from "leaflet";

export class MapManager {
    private readonly map: Leaflet.Map;

    constructor(containerId: string) {
        this.map = Leaflet.map(containerId).setView([55.751244, 37.618423], 12);

        Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri Satellite',
            maxZoom: 19
        }).addTo(this.map);
    }
}