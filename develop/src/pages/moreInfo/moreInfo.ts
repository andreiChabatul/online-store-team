import CreateElement from '../../utils/CreateElement';
import Slider from '../moreInfo/slider';
import { IProduct, IRenderComponent } from '../../types/index';
import './moreInfo.css';
import StateBasket from '../../components/basket/StateBasket';
import App from '../../App/App';
import RatingStar from '../../common-components/ratingStar/ratingStar';

export default class moreInfoCard implements IRenderComponent {
    addButton: HTMLButtonElement;
    obj: IProduct;

    constructor(obj: IProduct) {
        this.obj = obj;
        this.addButton = CreateElement.createButtonElement('moreinfo-text moreinfo-button', 'Add to cart');
    }

    render(): HTMLDivElement {
        const moreinfoCardContainer = CreateElement.createDivElement('moreinfo-container');
        const cardContainer = CreateElement.createDivElement('moreinfo-card-container');
        const prodactTitle = CreateElement.createDivElement('moreinfo-prodact-title');
        const h3 = CreateElement.createH1Element('moreinfo-title', `${this.obj.title}`);
        const prodactInfo = CreateElement.createDivElement('moreinfo-prodact-info');
        const prodactInfoList = CreateElement.createDivElement('moreinfo-prodact-info-list');
        const buttonsContainer = CreateElement.createDivElement('moreinfo-buttons-container');
        const buyButton = CreateElement.createButtonElement('moreinfo-text moreinfo-button', 'Buy now');
        const rating = new RatingStar(this.obj.rating).render();
        const slider = new Slider(this.obj).render();
        const prodactInfoItem1 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Price: `);
        const prodactInfoItem2 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Description: `);
        const prodactInfoItem3 = CreateElement.createParagraphElement(
            'moreinfo-item moreinfo-text',
            `Discount Percentage: `
        );
        const prodactInfoItem5 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Stock: `);
        const prodactInfoItem6 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Brand: `);
        const prodactInfoItem7 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Category: `);
        const prodactInfoSpanItem1 = CreateElement.createSpanElement(
            'moreinfo-text moreinfo-item-value',
            `$${this.obj.price}`
        );
        const prodactInfoSpanItem2 = CreateElement.createSpanElement(
            'moreinfo-text moreinfo-item-value',
            `${this.obj.description}`
        );
        const prodactInfoSpanItem3 = CreateElement.createSpanElement(
            'moreinfo-text moreinfo-item-value',
            `${this.obj.discountPercentage}`
        );
        const prodactInfoSpanItem5 = CreateElement.createSpanElement(
            'moreinfo-text moreinfo-item-value',
            `${this.obj.stock}`
        );
        const prodactInfoSpanItem6 = CreateElement.createSpanElement(
            'moreinfo-text moreinfo-item-value',
            `${this.obj.brand}`
        );
        const prodactInfoSpanItem7 = CreateElement.createSpanElement(
            'moreinfo-text moreinfo-item-value',
            `${this.obj.category}`
        );
        const breadCrumbCont = CreateElement.createDivElement('moreinfo-bread-crumb-cont');
        const breadCrumbItem = CreateElement.createParagraphElement(
            'moreinfo-bread-crumb-item moreinfo-text',
            `Store >> ${this.obj.category} >> ${this.obj.brand} >> ${this.obj.title}`
        );
        if (StateBasket.getBasketId().includes(this.obj.id)) {
            this.addButton.classList.add('moreinfo-button_active');
            this.addButton.textContent = 'drop from cart';
        }
        this.addButton.addEventListener('click', () => {
            StateBasket.setBasket(this.obj.id, this.obj.price);
            this.update();
        });
        buyButton.addEventListener('click', () => {
            !StateBasket.getBasketId().includes(this.obj.id) ? StateBasket.setBasket(this.obj.id, this.obj.price) : '';
            StateBasket.setIsBuyOpen(true);
            App.basketDone();
        });

        moreinfoCardContainer.append(breadCrumbCont, cardContainer);
        breadCrumbCont.append(breadCrumbItem);
        cardContainer.append(prodactTitle, slider, prodactInfo);
        prodactTitle.append(h3, rating);
        prodactInfo.append(prodactInfoList, buttonsContainer);

        prodactInfoList.append(
            prodactInfoItem1,
            prodactInfoItem2,
            prodactInfoItem3,
            prodactInfoItem5,
            prodactInfoItem6,
            prodactInfoItem7
        );
        prodactInfoItem1.append(prodactInfoSpanItem1);
        prodactInfoItem2.append(prodactInfoSpanItem2);
        prodactInfoItem3.append(prodactInfoSpanItem3);
        prodactInfoItem5.append(prodactInfoSpanItem5);
        prodactInfoItem6.append(prodactInfoSpanItem6);
        prodactInfoItem7.append(prodactInfoSpanItem7);
        buttonsContainer.append(this.addButton, buyButton);
        return moreinfoCardContainer;
    }

    update() {
        if (StateBasket.getBasketId().includes(this.obj.id)) {
            this.addButton.classList.add('moreinfo-button_active');
            this.addButton.textContent = 'drop from cart';
        } else {
            this.addButton.classList.remove('moreinfo-button_active');
            this.addButton.textContent = 'add to cart';
        }
    }
}
