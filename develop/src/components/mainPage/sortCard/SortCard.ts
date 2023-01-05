import State from '../../../State/State';
import { IRenderComponent } from '../../../types/index';
import { sortCard } from '../../../utils/AdditionalFunction';
import CreateElement from '../../../utils/CreateElement';
import './sortCard.css';

export default class SortCard implements IRenderComponent {
    render(): HTMLDivElement {
        const sortContainer = CreateElement.createDivElement('sort-container');
        const optionOne = CreateElement.createOptionElement(
            'select-container__options',
            'price-ASC',
            'Sort by priceASC'
        );
        const optionTwo = CreateElement.createOptionElement(
            'select-container__options',
            'price-DESC',
            'Sort by priceDESC'
        );
        const optionThree = CreateElement.createOptionElement(
            'select-container__options',
            'rating-ASC',
            'Sort by ratingASC'
        );
        const optionFour = CreateElement.createOptionElement(
            'select-container__options',
            'rating-DESC',
            'Sort by ratingDESC'
        );
        const optionFive = CreateElement.createOptionElement(
            'select-container__options',
            'discountPercentage-ASC',
            'Sort by discountASC'
        );
        const optionSix = CreateElement.createOptionElement(
            'select-container__options',
            'discountPercentage-DESC',
            'Sort by discountDESC'
        );
        const select = CreateElement.createSelectElement('select-container');
        select.append(optionOne, optionTwo, optionThree, optionFour, optionFive, optionSix);
        select.childNodes.forEach((element) => {
            (element as HTMLOptionElement).value.toUpperCase() === State.getSort().toUpperCase()
                ? (element as HTMLOptionElement).setAttribute('selected', 'selected')
                : '';
        });
        select.addEventListener('change', (e) => {
            const element = e.target as HTMLInputElement;
            const value = element.value;
            sortCard(value);
        });
        sortContainer.append(select);
        return sortContainer;
    }
}
