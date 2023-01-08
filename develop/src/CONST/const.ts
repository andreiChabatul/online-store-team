import { IPopUpItem, IPromoCode, searchField } from '../types/index';
import mirCard from '../assets/img/mirCard.png';
import sberCard from '../assets/img/sberCard.png';
import tinCard from '../assets/img/tinCard.png';

export const BODY = document.querySelector('body');
export const URL_API = 'https://productsonline-ce884-default-rtdb.europe-west1.firebasedatabase.app/products.json';
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
export const POP_UP: IPopUpItem[] = [
    {
        name: 'name',
        regEx: '^[a-zа-я]{3,}(\\s[a-zа-я]{3,})+',
        placeHolder: 'Name',
        maxLenght: 'Infinity',
    },
    {
        name: 'phone',
        regEx: '^\\+\\d{9,}$',
        placeHolder: 'Phone number',
        maxLenght: 'Infinity',
    },
    {
        name: 'address',
        regEx: '^[A-Za-zА-Яа-я0-9]{5,}(\\s[A-Za-zА-Яа-я0-9]{5,}){2,}',
        placeHolder: 'Delivery address',
        maxLenght: 'Infinity',
    },
    {
        name: 'email',
        regEx: '^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$',
        placeHolder: 'E-mail',
        maxLenght: 'Infinity',
    },
];
export const POP_UP_CARD: IPopUpItem[] = [
    {
        name: 'numberCard',
        regEx: '^\\d{4}(\\s\\d{4}){3}$',
        placeHolder: 'Card number',
        maxLenght: '19',
    },
    {
        name: 'dataCard',
        regEx: '(0[1-9]|1[0-2])/([0-9]{2})',
        placeHolder: 'Valid Th',
        maxLenght: '5',
    },
    {
        name: 'CVV',
        regEx: '^\\d{3}$',
        placeHolder: 'Code',
        maxLenght: '3',
    },
];
export const CARD_IMG: string[] = [mirCard, tinCard, sberCard];
export const eventsInput: string[] = ['blur', 'input', 'change'];
export const SEARCH_FIELD: searchField[] = ['title', 'description', 'brand', 'category'];
