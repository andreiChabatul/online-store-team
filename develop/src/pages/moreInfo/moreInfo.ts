import CreateElement from '../../utils/CreateElement';
import Slider from '../moreInfo/slider';
import { IProduct, IRenderComponent } from '../../types/index';
import './moreInfo.css';


export default class moreInfoCard implements IRenderComponent {
  obj: IProduct;
  constructor(obj: IProduct) {
    this.obj = obj;
  }
  render(): HTMLDivElement {
    const cardContainer = CreateElement.createDivElement('card-container');

    const prodactTitle = CreateElement.createDivElement('prodact-title');
    const h3 = CreateElement.createH1Element('title', `${this.obj.title}`);

    const prodactData = CreateElement.createDivElement('product-data');

    const prodactInfo = CreateElement.createDivElement('prodact-info');
    const prodactInfoList = CreateElement.createDivElement('prodact-info-list');
    const buttonsContainer = CreateElement.createDivElement('buttons-container');

    const addButton = CreateElement.createButtonElement('text button', 'Add to cart');
    const buyButton = CreateElement.createButtonElement('text button', 'Buy now');
    const slider = new Slider(this.obj).render();
    const prodactInfoItem1 = CreateElement.createParagraphElement('prodact-info-item text', `Price: ${this.obj.price}`);
    const prodactInfoItem2 = CreateElement.createParagraphElement('prodact-info-item text', `Description: ${this.obj.description}`);
    const prodactInfoItem3 = CreateElement.createParagraphElement('prodact-info-item text', `Discount Percentage: ${this.obj.discountPercentage}`);
    const prodactInfoItem4 = CreateElement.createParagraphElement('prodact-info-item text', `Rating: ${this.obj.rating}`);
    const prodactInfoItem5 = CreateElement.createParagraphElement('prodact-info-item text', `Stock: ${this.obj.stock}`);
    const prodactInfoItem6 = CreateElement.createParagraphElement('prodact-info-item text', `Brand: ${this.obj.brand}`);
    const prodactInfoItem7 = CreateElement.createParagraphElement('prodact-info-item text', `Category: ${this.obj.category}`);

    cardContainer.append(prodactTitle);
    prodactTitle.append(h3);

    cardContainer.append(prodactData);

    prodactData.append(slider);

    prodactData.append(prodactInfo);
    prodactInfo.append(prodactInfoList);
    prodactInfo.append(buttonsContainer);

    prodactInfoList.append(prodactInfoItem1, prodactInfoItem2, prodactInfoItem3, prodactInfoItem4, prodactInfoItem5, prodactInfoItem6, prodactInfoItem7);
    buttonsContainer.append(addButton, buyButton);
    return cardContainer;
  }
}