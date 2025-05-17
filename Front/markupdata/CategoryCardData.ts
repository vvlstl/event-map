import {TCategoryCard} from "~/types/info-events/TCategoryCard";

export class CategoryCardData {
    public static getCategoryCard(): TCategoryCard[] {
        return [
            {
                name: 'Интересы',
                type: 'interests',
                tags: [
                    '#настолки',
                    '#гончарное дело',
                    '#свечеварение',
                ],
            },
            {
                name: 'Движ',
                type: 'moves',
                tags: [
                    '#фесты',
                    '#концерты',
                    '#тусовки',
                ],
            },
            {
                name: 'Саморазвитие',
                type: 'development',
                tags: [
                    '#сбор_команды',
                    '#скейтбординг',
                    '#матчи',
                ],
            },
            {
                name: 'Социальные',
                type: 'social',
                tags: [
                    '#праздники',
                    '#акции',
                    '#волонтерство',
                ],
            },
        ]
    }
}