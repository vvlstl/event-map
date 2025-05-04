import {TEventCard} from "~/types/TEventCard";
import {faker} from "@faker-js/faker/locale/en";
import {TPicture} from "~/types/TPicture";

export class InfoEventsData {
    public static getMockEvents(count: number): TEventCard[] {
        return Array.from({length: count}, (_, i) => {
            const barnaulBounds = {
                latMin: 53.35,
                latMax: 53.40,
                lngMin: 83.75,
                lngMax: 83.80
            };

            const name = faker.lorem.words(3);

            const picture: TPicture = {
                src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                title: name,
            };

            return {
                id: i + 1,
                name: name,
                description: faker.lorem.paragraph(),
                address: faker.location.streetAddress(),
                date: faker.date.future().toLocaleDateString('ru-RU'),
                source: faker.helpers.arrayElement(['internal', 'external']),
                picture: picture,
                lat: faker.number.float({
                    min: barnaulBounds.latMin,
                    max: barnaulBounds.latMax,
                    fractionDigits: 4
                }),
                lng: faker.number.float({
                    min: barnaulBounds.lngMin,
                    max: barnaulBounds.lngMax,
                    fractionDigits: 4
                })
            };
        });
    }
}