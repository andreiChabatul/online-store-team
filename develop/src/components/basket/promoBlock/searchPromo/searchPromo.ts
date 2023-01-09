import { IRenderComponentForm } from '../../../../types/index';
import CreateElement from '../../../../utils/CreateElement';
import itemPromoCheck from '../itemPromoCheck/itemPromoCheck';
import './searchPromo.css';

export default class SearchPromo implements IRenderComponentForm {
    searchReset: HTMLButtonElement;

    constructor() {
        this.searchReset = CreateElement.createButtonElement('promo-search__reset', '', '', 'reset');
    }

    render(): HTMLFormElement {
        const searchPromo = CreateElement.createFormElement('promo-search');
        const searchInput = CreateElement.createInputElement('promo-search__input', 'Enter promo code', '', 'text');

        this.searchReset.addEventListener('click', () => {
            this.searchReset.classList.remove('promo-search__reset_active');
            itemPromoCheck.check('');
        });
        searchInput.addEventListener('input', () => {
            itemPromoCheck.check(searchInput.value);
            this.update(searchInput.value);
        });
        searchPromo.append(searchInput, this.searchReset);
        return searchPromo;
    }

    update(value: string): void {
        value
            ? this.searchReset.classList.add('promo-search__reset_active')
            : this.searchReset.classList.remove('promo-search__reset_active');
    }
}
