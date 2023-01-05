import State from '../../../State/State';
import { IRenderComponentSelect } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import './selectAmount.css';

export default class SelectAmount implements IRenderComponentSelect {
    selectAmount: HTMLSelectElement;

    constructor() {
        this.selectAmount = CreateElement.createSelectElement('card-container__amount');
    }

    render(): HTMLElement[] {
        const amountOptions: HTMLElement[] = [];
        for (let i = 8; i < 21; i += 4) {
            amountOptions.push(CreateElement.createOptionElement('amount-container__options', i, `Show by ${i}`));
        }
        return amountOptions;
    }

    get(): HTMLSelectElement {
        this.selectAmount.addEventListener('change', (e) => {
            const element = e.target as HTMLInputElement;
            const value = element.value;
            State.setSelectAmount(value);
        });
        this.render().forEach((element) => {
            this.selectAmount.append(element);
        });
        return this.selectAmount;
    }
}
