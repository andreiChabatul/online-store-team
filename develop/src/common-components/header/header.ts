import CreateElement from '../../utils/CreateElement';
import logoIco from '../../assets/img/logoIco.png';
import basketIco from '../../assets/img/basketIco.png';
import StateBasket from '../../components/basket/StateBasket';
import router from '../../router/router';
import { updateUrl, updateUrlMain } from '../../utils/AdditionalFunction';
import { IComponentUpdate } from '../../types/index';
import './header.css';
import { State } from '../../State/State';

export default class Header implements IComponentUpdate {
    header: HTMLDivElement;
    headerTotalPrice: HTMLSpanElement;
    headerBasketText: HTMLParagraphElement;

    constructor() {
        this.header = CreateElement.createDivElement('header-wraper');
        this.headerTotalPrice = CreateElement.createSpanElement(
            'header-total__text',
            StateBasket.getFinishPrice().toFixed(2)
        );
        this.headerBasketText = CreateElement.createParagraphElement(
            'basket-quantity_text',
            StateBasket.getAmountProducts() || '0'
        );
    }

    render() {
        const result = [];
        const headerLogo = CreateElement.createDivElement('header-logo');
        const headerLogoIco = CreateElement.createDivElement('header-logo__ico ico');
        const headerLogoImg = CreateElement.createImgElement('header-logo__ico_img ico_img', logoIco);
        const headerLogoText = CreateElement.createH1Element('header-logo__text', 'ONLINE STORE');
        const headerTotal = CreateElement.createDivElement('header-total');
        const headerTotalTitle = CreateElement.createSpanElement('header-total__text', 'Cart total: $');
        const headerBasket = CreateElement.createDivElement('header-basket');
        const headerBasketIco = CreateElement.createDivElement('header-basket__ico ico');
        const headerBasketImg = CreateElement.createImgElement('header-basket__ico-img ico_img', basketIco);
        const headerBasketQuantity = CreateElement.createDivElement('basket-quantity');

        headerBasketQuantity.append(this.headerBasketText);
        headerBasketIco.append(headerBasketImg);
        headerLogoIco.append(headerLogoImg);
        headerLogo.append(headerLogoIco, headerLogoText);
        headerTotal.append(headerTotalTitle, this.headerTotalPrice);
        headerBasket.append(headerBasketIco, headerBasketQuantity);
        headerLogo.addEventListener('click', () => {
            router.navigateTo('');
            updateUrl.reset();
            updateUrlMain.reset();
            State.resetFilter();
        });
        headerBasket.addEventListener('click', () => {
            router.navigateTo('cart');
            updateUrl.reset();
            updateUrlMain.reset();
            State.resetFilter();
        });
        result.push(headerLogo, headerTotal, headerBasket);
        return result;
    }

    update() {
        this.headerTotalPrice.textContent = StateBasket.getFinishPrice().toFixed(2);
        this.headerBasketText.textContent = String(StateBasket.getAmountProducts() || '0');
    }

    fill() {
        this.render().forEach((element) => {
            this.header.append(element);
        });
    }

    get() {
        this.fill();
        return this.header;
    }
}
