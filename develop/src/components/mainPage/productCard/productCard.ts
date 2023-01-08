import { State } from '../../../State/State';
import StateBasket from '../../basket/StateBasket';
import CreateElement from '../../../utils/CreateElement';
import { addBasket } from '../../../utils/AdditionalFunction';
import RatingStar from '../../../common-components/ratingStar/ratingStar';
import { IProduct, IRenderComponent } from '../../../types/index';
import './productsCard.css';
import router from '../../../router/router';

export default class ProductCard implements IRenderComponent {
    obj: IProduct;
    constructor(obj: IProduct) {
        this.obj = obj;
    }

    render(): HTMLDivElement {
        let select: 'tile' | 'line';
        State.getBig() ? (select = 'tile') : (select = 'line');
        const ratingStar: HTMLDivElement = new RatingStar(this.obj.rating).render();
        const cardProduct = CreateElement.createDivElement(`card-product_${select} card-product`);
        const cardProductSale = CreateElement.createParagraphElement(
            `card-product__sale_${select} card-product__sale`,
            `Sale: ${this.obj.discountPercentage} %`
        );
        const cardProductTitle = CreateElement.createParagraphElement(
            `card-product__title_${select} card-product__title`,
            this.obj.title
        );
        const cardProductRating = CreateElement.createDivElement(`card-product__rating_${select}`);
        const cardDescription = CreateElement.createParagraphElement(
            `card-product-description card-product-description_${select}`,
            this.obj.description
        );
        const cardProductImg = CreateElement.createImgElement(
            `card-product__img_${select} card-product__img`,
            this.obj.thumbnail
        );
        const cardProductPrice = CreateElement.createParagraphElement(
            `card-product__price_${select} card-product__price`,
            `Price: ${this.obj.price} $`
        );
        const cardButton = CreateElement.createDivElement(`card-product__button_${select}`);

        cardProductRating.append(ratingStar);
        cardProduct.append(
            cardProductSale,
            cardProductImg,
            cardProductTitle,
            cardProductRating,
            cardProductPrice,
            cardButton,
            cardDescription
        );

        const buttonInfo = CreateElement.createButtonElement('button-product', 'more info');
        const buttonBasket = CreateElement.createButtonElement('button-product', 'add to cart');

        if (StateBasket.getBasketId().includes(this.obj.id)) {
            buttonBasket.textContent = 'drop from cart';
            buttonBasket.classList.add('button-product_active');
        }

        buttonBasket.addEventListener('click', () => {
            addBasket(this.obj.id);
        });
        buttonInfo.addEventListener('click', () => {
            router.navigateTo(`product-details/${Number(this.obj.id)}`);
        });
        cardButton.append(buttonInfo, buttonBasket);

        return cardProduct;
    }
}
