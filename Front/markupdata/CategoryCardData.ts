import {TCategoryCard} from "~/types/info-events/TCategoryCard";

export class CategoryCardData {
    public static getCategoryCard(): TCategoryCard[] {
        return [
            {
                name: 'Интересы',
                code: 'interests',
                tags: [
                    '#настолки',
                    '#гончарное дело',
                    '#свечеварение',
                ],
                color: '#FF4373',
            },
            {
                name: 'Движ',
                code: 'moves',
                tags: [
                    '#фесты',
                    '#концерты',
                    '#тусовки',
                ],
                color: '#FF43D0',
            },
            {
                name: 'Саморазвитие',
                code: 'development',
                tags: [
                    '#сбор_команды',
                    '#скейтбординг',
                    '#матчи',
                ],
                color: '#4369FF',
            },
            {
                name: 'Социальные',
                code: 'social',
                tags: [
                    '#праздники',
                    '#акции',
                    '#волонтерство',
                ],
                color: '#FACD1C',
            },
        ]
    }
}