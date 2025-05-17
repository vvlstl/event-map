import {TEventCard} from "~/types/info-events/TEventCard";
import {faker} from "@faker-js/faker/locale/en";
import {TPicture} from "~/types/TPicture";
import {TLabel} from "~/types/TLabel";

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

            const label: TLabel = {
                text: faker.lorem.words(1),
                type: faker.helpers.arrayElement(['interests', 'moves', 'social', 'development']),
            }

            return {
                id: i + 1,
                name: name,
                previewText: faker.lorem.paragraph(),
                detailText: `
## ${faker.lorem.sentence()}

${faker.lorem.paragraphs(2)}

**Основные моменты:**
- ${faker.lorem.sentence()}
- ${faker.lorem.sentence()}
- ${faker.lorem.sentence()}

*Дата проведения: ${faker.date.future().toLocaleDateString()}*

[Подробнее](${faker.internet.url()})
    `.trim(),
                tags: faker.helpers.arrayElement([
                    [
                        '#настолки',
                        '#D&D',
                    ],
                    [
                        '#настолки',
                        '#гончарное дело',
                        '#свечеварение',
                    ]
                ]),
                picture: picture,
                label: label,
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