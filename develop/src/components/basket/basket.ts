import CreateElement from '../../utils/CreateElement';
import { CartsFactories } from './cartProduct/cartsFactories';
import PaginationBasket from './paganationBlock/paginationBasket';
import itemPromoCheck from './promoBlock/itemPromoCheck/itemPromoCheck';
import StateBasket from './StateBasket';
import { Summary } from './summary/summary';
import { IComponent } from '../../types/index';
import './basket.css';
import PopUpBuy from './popUpBuy/popUpBuy';

export default class Basket implements IComponent {
    basketContainer: HTMLDivElement;

    constructor() {
        this.basketContainer = CreateElement.createDivElement('basket-container');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        if (StateBasket.getBasket().length > 0) {
            const productsCart = CreateElement.createDivElement('products-cart-container');
            const productsCartHeader = CreateElement.createDivElement('products-cart__header');
            const cartHeaderTitle = CreateElement.createParagraphElement('cart__header_title', 'Products In Cart');
            const containerCarts = new CartsFactories();
            const summary = new Summary();
            const basketPagination = new PaginationBasket();
            const popUpBuy = new PopUpBuy();

            StateBasket.register(containerCarts, summary, itemPromoCheck, basketPagination, popUpBuy, this);
            productsCartHeader.append(cartHeaderTitle, basketPagination.get());
            productsCart.append(productsCartHeader, containerCarts.get());
            result.push(productsCart, summary.get(), popUpBuy.get());
        } else {
            const emptyCart = CreateElement.createParagraphElement('empty-cart', 'Cart is Empty');
            result.push(emptyCart);
        }
        return result;
    }

    fill(): void {
        this.render().forEach((element) => {
            this.basketContainer.append(element);
        });
    }

    clear(): void {
        this.basketContainer.innerHTML = '';
    }

    update(): void {
        if (StateBasket.getBasket().length === 0) {
            this.clear();
            const emptyCart = CreateElement.createParagraphElement('empty-cart', 'Cart is Empty');
            this.basketContainer.append(emptyCart);
        }
    }

    get(): HTMLDivElement {
        this.fill();
        return this.basketContainer;
    }
}
