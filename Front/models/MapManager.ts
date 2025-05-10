import L from "leaflet";
import {TMarker} from "~/types/TMarker";
import EventBus from "~/js/helper/event-bus";
import {TEventCard} from "~/types/TEventCard";
import {show} from "~/js/controllers/popup";

export class MapManager {
    private readonly map: L.Map;
    protected markers: L.Marker[] = [];
    private tileLayer?: L.TileLayer;

    constructor(containerId: string) {
        this.map = L.map(containerId).setView([53.3481, 83.7796], 13);
        this.initTileLayer();
        this.initEventListeners();
    }

    /**
     * Асинхронная инициализация (если нужно дождаться загрузки данных)
     */
    async init(): Promise<void> {
        return new Promise((resolve) => {
            this.map.whenReady(() => {
                resolve();
            });
        });
    }

    /**
     * Инициализация базового слоя карты
     */
    private initTileLayer(): void {
        this.tileLayer = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '© Esri Satellite',
                maxZoom: 19
            }
        ).addTo(this.map);
    }

    /**
     * Инициализация обработчиков событий
     */
    private initEventListeners(): void {
        // Обработка клика по карте
        this.map.on('click', (e: L.LeafletMouseEvent) => {
            EventBus.emit('click-to-map', {
                latlng: e.latlng,
            });
        });

        // Очистка при уничтожении карты
        this.map.on('unload', () => {
            this.clearMarkers();
        });
    }

    /**
     * Добавление одного маркера
     */
    addMarker(lat: number, lng: number, options?: L.MarkerOptions): L.Marker {
        const marker = L.marker([lat, lng], options).addTo(this.map);

        marker.on('click', (e: L.LeafletMouseEvent) => {
            EventBus.emit('click-to-marker', {
                latlng: e.latlng,
            });
        });

        this.markers.push(marker);
        return marker;
    }

    /**
     * Добавление нескольких маркеров
     */
    addMarkers(markersData: Array<TMarker>): L.Marker[] {
        return markersData.map(marker => {
            return this.addMarker(
                marker.lat,
                marker.lng,
                marker.options
            );
        });
    }

    /**
     * Удаление всех маркеров
     */
    clearMarkers(): void {
        this.markers.forEach(marker => {
            marker.remove();
        });
        this.markers = [];
    }

    /**
     * Показать попап на карте
     */
    showPopupAt(latlng: L.LatLng, content: string): void {
        L.popup()
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this.map);
    }

    /**
     * Обработчик клика по маркеру
     */
    onMarkerClick(latlng: L.LatLng, content: TEventCard): void {
        show('event', {
            title: content.name,
            text: content.description,
            picture: content.picture,
        });
    }

    /**
     * Изменить центр карты
     */
    setView(lat: number, lng: number, zoom?: number): void {
        this.map.setView([lat, lng], zoom || this.map.getZoom());
    }

    /**
     * Получить текущий зум
     */
    getZoom(): number {
        return this.map.getZoom();
    }

    /**
     * Уничтожение карты
     */
    destroy(): void {
        this.clearMarkers();
        this.map.off();
        this.map.remove();
    }

    /**
     * Проверка, существует ли карта
     */
    isInitialized(): boolean {
        if (!this.map) return false;
        const container = this.map.getContainer();
        return !!container && container.hasChildNodes();
    }
}