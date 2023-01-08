import { State } from '../../../State/State';
import { IRenderComponentForm } from '../../../types/index';
import { searchEnter } from '../../../utils/AdditionalFunction';
import CreateElement from '../../../utils/CreateElement';
import './searchCard.css';

export default class SearchCards implements IRenderComponentForm {
    searchReset: HTMLButtonElement;
    searchInput: HTMLInputElement;

    constructor() {
        this.searchReset = CreateElement.createButtonElement('card-search__reset', '', '', 'reset');
        this.searchInput = CreateElement.createInputElement('card-search__input', '', '', 'text', State.getSeacrh());
        State.getSeacrh()
            ? this.searchReset.classList.add('card-search__reset_active')
            : this.searchReset.classList.remove('card-search__reset_active');
    }

    render(): HTMLFormElement {
        const searchCard = CreateElement.createFormElement('card-search');

        this.searchInput.setAttribute('placeholder', 'Search product');
        this.searchReset.addEventListener('click', () => {
            searchEnter('');
            this.update();
        });
        this.searchInput.addEventListener('input', () => {
            searchEnter(this.searchInput.value);
            this.update();
        });
        searchCard.append(this.searchInput, this.searchReset);
        return searchCard;
    }

    update(): void {
        this.searchInput.setAttribute('value', State.getSeacrh());
        State.getSeacrh()
            ? this.searchReset.classList.add('card-search__reset_active')
            : this.searchReset.classList.remove('card-search__reset_active');
    }
}
