import {TPicture} from "~/types/TPicture";

export type TEventCard = {
    id: number;
    name: string;
    description: string;
    address: string;
    date: string,
    source: string;
    picture: TPicture;
    lat: number,
    lng: number,
}