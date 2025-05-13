import type { Languages } from '@/interfaces/language';

export const DEFAULT_DELAY = 5000;

export const AVAILABLE_VIDEOS = [
    'https://cdn.pixabay.com/video/2025/04/29/275633_large.mp4',
    'https://cdn.pixabay.com/video/2025/03/29/268528_large.mp4',
    'https://cdn.pixabay.com/video/2025/04/09/270940_large.mp4',
    'https://cdn.pixabay.com/video/2016/06/27/3627-172488393_large.mp4',
    'https://cdn.pixabay.com/video/2019/02/01/21116-315137080_large.mp4',
    'https://cdn.pixabay.com/video/2019/05/03/23258-334228230_large.mp4',
    'https://cdn.pixabay.com/video/2023/11/19/189813-887078786_large.mp4',
];

export const CONTENT_SHOW_DEMO = {
    es: {
        name: 'El día de la independencia',
        originalTitle: 'Independence Day',
        year: 1996,
        rating: 'B',
        duration: '2h 25min',
        genres: ['Ciencia ficción', 'Acción'],
        poster: '/images/poster.png',
        imdb: 'https://www.imdb.com/es/title/tt0116629',
        description:
            'Los alienígenas están en camino y pretenden invadir y destruir la Tierra. Nuestra mejor arma es nuestra voluntad de vivir.',
    },
    pr: {
        name: 'Independence Day',
        originalTitle: 'Independence Day',
        year: 1996,
        rating: 'B',
        duration: '2h 25min',
        genres: ['Ficção científica', 'Ação'],
        poster: '/images/poster.png',
        imdb: 'https://www.imdb.com/pt/title/tt0116629',
        description:
            'Os extraterrestres estão em camino é sua meta é invadir e destroir a Terra, Para lutar com tecnologia superior, a arma da humanidade é a vontade de viver.',
    },
};

export const LANGUAGES: Languages = [
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'pr', label: 'Portugués', flag: '🇧🇷' },
];
