import { State } from '../../../State/State';
import { IComponentUpdate, IFilterText, IObjFilter } from '../../../types/index';
import { createFilter, filterCheck } from '../../../utils/AdditionalFunction';
import CreateElement from '../../../utils/CreateElement';
import './filterCard.css';

export default class FilterCard implements IComponentUpdate {
    private filterContainer: HTMLDivElement;
    private obj: IObjFilter;
    private atr: 'category' | 'brand';

    constructor(obj: IObjFilter, atr: 'category' | 'brand') {
        this.obj = obj;
        this.atr = atr;
        this.filterContainer = CreateElement.createDivElement('filter-container__one', '', '', this.atr);
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        for (const key in this.obj) {
            result.push(this.createItemFilter(this.obj[key]));
        }
        return result;
    }

    fill() {
        this.render().forEach((element) => {
            this.filterContainer.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        this.update();
        return this.filterContainer;
    }

    update(): void {
        const arr: IObjFilter = createFilter(State.getData(), this.atr);
        this.filterContainer.childNodes.forEach((element) => {
            (element as HTMLDivElement).classList.add('filter-container__check_disable');
            const label = element.childNodes[1];
            const span = element.childNodes[2].childNodes[0];
            (element.childNodes[0] as HTMLInputElement).removeAttribute('checked');
            span.textContent = '(0';
            if (arr[(label as HTMLLabelElement).innerText]) {
                State.getFilter()[this.atr].forEach((elem) => {
                    if (arr[(label as HTMLLabelElement).innerText].name === elem) {
                        (element.childNodes[0] as HTMLInputElement).setAttribute('checked', 'checked');
                    }
                });
                span.textContent = `(${arr[(label as HTMLLabelElement).innerText].quantity}`;
                (element as HTMLDivElement).classList.remove('filter-container__check_disable');
            }
        });
    }

    createItemFilter(obj: IFilterText): HTMLDivElement {
        const element = CreateElement.createDivElement('filter-container__check');
        const input = CreateElement.createInputElement('filter-container__input', '', obj.name, 'checkbox', this.atr);
        const label = CreateElement.createLabelElement('filter-container__label', obj.name);
        const span = CreateElement.createDivElement('filter-container__span');
        const spanOne = CreateElement.createSpanElement('filter__span_one', `(${obj.quantity}`);
        const spanTwo = CreateElement.createSpanElement('filter__span_two', `/${obj.quantity})`);
        label.setAttribute('for', obj.name);
        input.addEventListener('change', () => {
            input.value === 'brand' || input.value === 'category' ? filterCheck(input.id, input.value) : '';
        });
        span.append(spanOne, spanTwo);
        element.append(input, label, span);
        return element;
    }
}
