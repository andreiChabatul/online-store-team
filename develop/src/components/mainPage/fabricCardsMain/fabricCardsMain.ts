import State from '../../../State/State';
import { IComponentUpdate } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import ProductCard from '../productCard/productCard';
import './fabricCardsMain.css';

export default class CardsProduct implements IComponentUpdate {
    cardWraper: HTMLDivElement;

    constructor() {
        this.cardWraper = CreateElement.createDivElement('card-container__wrapper');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        if (State.getDoneData().length > 0) {
            State.getDoneData().forEach((obj) => {
                result.push(new ProductCard(obj).render());
            });
        } else {
            const emptyCard = CreateElement.createParagraphElement(
                'card-container__wrapper_empty',
                'Products no found'
            );
            result.push(emptyCard);
        }
        return result;
    }

    clear(): void {
        this.cardWraper.innerHTML = '';
    }

    update(): void {
        this.clear();
        this.fill();
    }

    fill(): void {
        this.render().forEach((element) => {
            this.cardWraper.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        return this.cardWraper;
    }
}
