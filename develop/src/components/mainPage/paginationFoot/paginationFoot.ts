import State from '../../../State/State';
import { IComponentUpdate } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import './paginationFoot.css';

export default class PaginationFoot implements IComponentUpdate {
    paginationMain: HTMLDivElement;
    constructor() {
        this.paginationMain = CreateElement.createDivElement('card__pagination');
    }

    render(): HTMLElement[] {
        const resultItem: HTMLElement[] = [];
        for (let i = 0; i < State.getAmountPage(); i++) {
            resultItem.push(CreateElement.createParagraphElement('pagination__item', i + 1, `${i}mainItem`));
        }
        if (resultItem.length > 0) {
            resultItem[State.getPagination().selectPage].classList.add('pagination__item_action');
        }
        return resultItem;
    }

    clear(): void {
        this.paginationMain.innerHTML = '';
    }

    update(): void {
        this.clear();
        this.fill();
    }

    fill(): void {
        this.render().forEach((element) => {
            this.paginationMain.append(element);
        });
    }
    get(): HTMLDivElement {
        this.paginationMain.addEventListener('click', (e) => {
            const element = e.target as HTMLInputElement;
            const value = element.id;
            value ? State.setSelectPage(value[0]) : '';
        });
        this.fill();
        return this.paginationMain;
    }
}
