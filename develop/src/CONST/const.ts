import { IPromoCode } from '../types/index';
export const BODY = document.querySelector('body');
export const URL_API = 'https://dummyjson.com/products?limit=25';
export const PROMO_CODE: IPromoCode[] = [
    {
        name: 'RS',
        discont: 0.9,
        text: 'Rolling Scopes School - 10%',
    },
    {
        name: 'EPM',
        discont: 0.85,
        text: 'EPAM Systems - 15%',
    },
    {
        name: 'CHABATUL',
        discont: 0,
        text: 'Chabatul Andrei - 0%',
    },
];
