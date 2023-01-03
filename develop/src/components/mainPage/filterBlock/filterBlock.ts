import router from '../../../router/router';
import State from '../../../State/State';
import { IRenderComponent } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import FilterCard from '../filterCard/filterCard';
import FilterCardRange from '../filterCard/filterCardRange';
import './filterBlock.css';

export default class FilterBlock implements IRenderComponent {
    render(): HTMLDivElement {
        const cardFilter = CreateElement.createDivElement('filter-block-container');
        const filterButtonContainer = CreateElement.createDivElement('filter-block-container__button');
        const categoryFilter = CreateElement.createDivElement('filter-block-container__one');
        const brandFilter = CreateElement.createDivElement('filter-block-container__one');
        const priceFilter = CreateElement.createDivElement('filter-block-container__two');
        const stockFilter = CreateElement.createDivElement('filter-block-container__two');
        const categoryFilterTitle = CreateElement.createParagraphElement('filter-block-container_title', 'Category');
        const brandFilterTitle = CreateElement.createParagraphElement('filter-block-container_title', 'Brand');
        const priceFilterTitle = CreateElement.createParagraphElement('filter-block-container_title', 'Price');
        const stockFilterTitle = CreateElement.createParagraphElement('filter-block-container_title', 'Stock');
        const buttonReset = CreateElement.createButtonElement('filter-button', 'Reset Filter');
        const buttonCopy = CreateElement.createButtonElement('filter-button', 'Copy Link');
        const filterRangePrice = new FilterCardRange(State.getFilterPrice(), 'price');
        const filterRangeStock = new FilterCardRange(State.getFilterStock(), 'stock');
        const filterBrand = new FilterCard(State.getFilterBrand(), 'brand');
        const filterCategory = new FilterCard(State.getFilterCategory(), 'category');
        State.register(filterRangePrice, filterRangeStock, filterBrand, filterCategory);

        buttonReset.addEventListener('click', () => {
            State.resetFilter();
            router.navigateTo('');
        });
        buttonCopy.addEventListener('click', () => navigator.clipboard.writeText(window.location.href));

        filterButtonContainer.append(buttonReset, buttonCopy);
        categoryFilter.append(categoryFilterTitle, filterCategory.get());
        brandFilter.append(brandFilterTitle, filterBrand.get());
        priceFilter.append(priceFilterTitle, filterRangePrice.get());
        stockFilter.append(stockFilterTitle, filterRangeStock.get());

        cardFilter.append(filterButtonContainer, categoryFilter, brandFilter, priceFilter, stockFilter);
        return cardFilter;
    }
}
