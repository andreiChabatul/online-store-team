import { IComponentUpdate } from '../../../types/index';
import { updateUrl } from '../../../utils/AdditionalFunction';
import CreateElement from '../../../utils/CreateElement';
import StateBasket from '../StateBasket';
import './paginationBasket.css';

export default class PaginationBasket implements IComponentUpdate {
    paginationContainer: HTMLDivElement;

    constructor() {
        this.paginationContainer = CreateElement.createDivElement('pagination-container');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        const showBlock = CreateElement.createDivElement('show-container');
        const showBlockTitle = CreateElement.createParagraphElement('show-container_title', 'ITEMS:');
        const showBlockInput = CreateElement.createInputElement(
            'show-container_input',
            '',
            '',
            'number',
            StateBasket.getPagination().amount
        );
        const pageBlock = CreateElement.createDivElement('show-container');
        const pageBlockTitle = CreateElement.createParagraphElement('show-container_title', 'PAGE:');
        const pageSelect = CreateElement.createDivElement('select-page');
        const pagePrev = CreateElement.createParagraphElement('show-array', '◁', 'prevPage');
        const pageActive = CreateElement.createParagraphElement(
            'show-page',
            StateBasket.getPagination().selectPage + 1
        );
        const pageNext = CreateElement.createParagraphElement('show-array', '▷', 'nextPage');

        showBlockInput.setAttribute('step', '1');
        showBlockInput.addEventListener('change', (e) => {
            const element = e.target as HTMLInputElement;
            const value = element.value;
            StateBasket.setLimitPagination(Number(value));
            updateUrl.set('limit');
        });
        pageSelect.addEventListener('click', (e) => {
            const element = e.target as HTMLInputElement;
            const value = element.id;
            StateBasket.setPagePagination(value);
            updateUrl.set('page');
        });
        pageSelect.append(pagePrev, pageActive, pageNext);
        pageBlock.append(pageBlockTitle, pageSelect);
        showBlock.append(showBlockTitle, showBlockInput);
        result.push(showBlock, pageBlock);
        return result;
    }

    clear(): void {
        this.paginationContainer.innerHTML = '';
    }

    update(): void {
        this.clear();
        this.fill();
    }

    fill(): void {
        this.render().forEach((element) => {
            this.paginationContainer.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        return this.paginationContainer;
    }
}
