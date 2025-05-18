import {TPicture} from "~/types/TPicture";
import {TLabel} from "~/types/TLabel";

export type TEventCard = {
    id: number,
    name: string,
    previewText: string,
    detailText: string,
    tags?: string[],
    label: TLabel,
    picture?: TPicture,
    lat: number,
    lng: number,
}
