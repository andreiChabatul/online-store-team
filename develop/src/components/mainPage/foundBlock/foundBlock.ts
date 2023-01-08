import { State } from '../../../State/State';
import { IComponentUpdate } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import './foundBlock.css';

export default class FoundProduct implements IComponentUpdate {
    foundProduct: HTMLDivElement;
    selectFoundAmount: HTMLSpanElement;

    constructor() {
        this.foundProduct = CreateElement.createDivElement('card-container__found');
        this.selectFoundAmount = CreateElement.createSpanElement(
            'card-found__amount card-found_text',
            State.getData().length
        );
    }

    render(): void {
        const selectFoundTitle = CreateElement.createSpanElement(
            'card-found__title card-found_text',
            'Found product: '
        );
        this.foundProduct.append(selectFoundTitle, this.selectFoundAmount);
    }

    get(): HTMLDivElement {
        this.render();
        return this.foundProduct;
    }

    update(): void {
        this.selectFoundAmount.textContent = String(State.getData().length);
    }
}
