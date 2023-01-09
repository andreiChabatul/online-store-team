import { IComponentUpdate } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import CartProduct from '../productsInCart/productsInCart';
import StateBasket from '../StateBasket';
import './cartsFactories.css';

export class CartsFactories implements IComponentUpdate {
    containerCarts: HTMLDivElement;

    constructor() {
        this.containerCarts = CreateElement.createDivElement('carts-container');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        let item: number = StateBasket.getPagination().amount * StateBasket.getPagination().selectPage;
        StateBasket.getDoneBasket().forEach((element) => {
            item++;
            result.push(new CartProduct(element, item).render());
        });
        return result;
    }

    clear(): void {
        this.containerCarts.innerHTML = '';
    }

    update(): void {
        this.clear();
        this.fill();
    }

    fill(): void {
        this.render().forEach((element) => {
            this.containerCarts.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        return this.containerCarts;
    }
}
