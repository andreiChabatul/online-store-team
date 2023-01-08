import RatingStar from '../../../common-components/ratingStar/ratingStar';
import router from '../../../router/router';
import { State } from '../../../State/State';
import { IBasket, IProduct, IRenderComponent } from '../../../types/index';
import { closeCart } from '../../../utils/AdditionalFunction';
import CreateElement from '../../../utils/CreateElement';
import AmountProduct from './productAmount';
import './productsInCart.css';

export default class CartProduct implements IRenderComponent {
    obj: IBasket;
    numberItem: number;

    constructor(obj: IBasket, numberItem: number) {
        this.obj = obj;
        this.numberItem = numberItem;
    }

    render(): HTMLDivElement {
        const productObj: IProduct = State.getInitData()[this.obj.id - 1];
        const cartProduct = CreateElement.createDivElement('products-carts');
        const cartItem = CreateElement.createParagraphElement('products-carts__item', this.numberItem);
        const cartInfo = CreateElement.createDivElement('products-carts__info');
        const cartInfoImg = CreateElement.createImgElement('products-carts__img', productObj.thumbnail);
        const cartInfoTitle = CreateElement.createParagraphElement('products-carts__title', productObj.title);
        const cartInfoLine = CreateElement.createDivElement('products-carts__line');
        const cartInfoDescription = CreateElement.createParagraphElement(
            'products-carts__description',
            productObj.description
        );
        const cartInfoContainer = CreateElement.createDivElement('products-carts__container');
        const cartInfoRating = CreateElement.createDivElement('products-carts__rating');
        const cartInfoDiscont = CreateElement.createParagraphElement(
            'products-carts__discont',
            `Discount: ${productObj.discountPercentage} %`
        );
        const cartClose = CreateElement.createDivElement('products-carts__close');
        const cartAmount: IRenderComponent = new AmountProduct(this.obj, productObj.stock);
        const rating = new RatingStar(productObj.rating).render();
        cartProduct.addEventListener('click', () => {
            router.navigateTo(`product-details/${Number(this.obj.id)}`);
        });
        cartClose.addEventListener('click', (e) => {
            closeCart(this.obj);
            e.stopPropagation();
        });
        cartInfoRating.append(rating);
        cartInfoContainer.append(cartInfoRating, cartInfoDiscont);
        cartInfo.append(cartInfoImg, cartInfoTitle, cartInfoLine, cartInfoDescription, cartInfoContainer);
        cartProduct.append(cartItem, cartInfo, cartAmount.render(), cartClose);
        return cartProduct;
    }
}
