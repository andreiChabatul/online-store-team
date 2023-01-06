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
    const moreinfoCardContainer = CreateElement.createDivElement('moreinfo-container');
    const cardContainer = CreateElement.createDivElement('moreinfo-card-container');

    const prodactTitle = CreateElement.createDivElement('moreinfo-prodact-title');
    const h3 = CreateElement.createH1Element('moreinfo-title', `${this.obj.title}`);

    const prodactData = CreateElement.createDivElement('moreinfo-product-data');

    const prodactInfo = CreateElement.createDivElement('moreinfo-prodact-info');
    const prodactInfoList = CreateElement.createDivElement('moreinfo-prodact-info-list');
    const buttonsContainer = CreateElement.createDivElement('moreinfo-buttons-container');

    const addButton = CreateElement.createButtonElement('moreinfo-text moreinfo-button', 'Add to cart');
    const buyButton = CreateElement.createButtonElement('moreinfo-text moreinfo-button', 'Buy now');
    const slider = new Slider(this.obj).render();
    const prodactInfoItem1 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Price: ${this.obj.price}`);
    const prodactInfoItem2 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Description: ${this.obj.description}`);
    const prodactInfoItem3 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Discount Percentage: ${this.obj.discountPercentage}`);
    const prodactInfoItem4 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Rating: ${this.obj.rating}`);
    const prodactInfoItem5 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Stock: ${this.obj.stock}`);
    const prodactInfoItem6 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Brand: ${this.obj.brand}`);
    const prodactInfoItem7 = CreateElement.createParagraphElement('moreinfo-item moreinfo-text', `Category: ${this.obj.category}`);

    const prodactInfoSpanItem1 = CreateElement.createSpanElement(' moreinfo-text moreinfo-item-value', `${this.obj.price}`);
    const prodactInfoSpanItem2 = CreateElement.createSpanElement(' moreinfo-text moreinfo-item-value', `${this.obj.description}`);
    const prodactInfoSpanItem3 = CreateElement.createSpanElement(' moreinfo-text moreinfo-item-value', `${this.obj.discountPercentage}`);
    const prodactInfoSpanItem4 = CreateElement.createSpanElement(' moreinfo-text moreinfo-item-value', `${this.obj.rating}`);
    const prodactInfoSpanItem5 = CreateElement.createSpanElement(' moreinfo-text moreinfo-item-value', `${this.obj.stock}`);
    const prodactInfoSpanItem6 = CreateElement.createSpanElement(' moreinfo-text moreinfo-item-value', `${this.obj.brand}`);
    const prodactInfoSpanItem7 = CreateElement.createSpanElement(' moreinfo-text moreinfo-item-value', `${this.obj.category}`);

    const breadCrumbCont = CreateElement.createDivElement('moreinfo-bread-crumb-cont');
    const breadCrumbItem1 = CreateElement.createParagraphElement('moreinfo-bread-crumb-item moreinfo-text', 'Store');
    const breadCrumbItem2 = CreateElement.createParagraphElement('moreinfo-bread-crumb-item moreinfo-text', `${this.obj.category}`);
    const breadCrumbItem3 = CreateElement.createParagraphElement('moreinfo-bread-crumb-item moreinfo-text', `${this.obj.brand}`);
    const breadCrumbItem4 = CreateElement.createParagraphElement('moreinfo-bread-crumb-item moreinfo-text', `${this.obj.title}`);
    const breadCrumbSeparator1 = CreateElement.createParagraphElement('moreinfo-text', '>>');
    const breadCrumbSeparator2 = CreateElement.createParagraphElement('moreinfo-text', '>>');
    const breadCrumbSeparator3 = CreateElement.createParagraphElement('moreinfo-text', '>>');

    moreinfoCardContainer.append(breadCrumbCont, cardContainer);

    breadCrumbCont.append(breadCrumbItem1, breadCrumbSeparator1, breadCrumbItem2, breadCrumbSeparator2, breadCrumbItem3, breadCrumbSeparator3, breadCrumbItem4);

    cardContainer.append(prodactTitle);
    prodactTitle.append(h3);

    cardContainer.append(prodactData);

    prodactData.append(slider);

    prodactData.append(prodactInfo);
    prodactInfo.append(prodactInfoList);
    prodactInfo.append(buttonsContainer);

    prodactInfoList.append(prodactInfoItem1, prodactInfoItem2, prodactInfoItem3, prodactInfoItem4, prodactInfoItem5, prodactInfoItem6, prodactInfoItem7);
    prodactInfoItem1.append(prodactInfoSpanItem1);
    prodactInfoItem2.append(prodactInfoSpanItem2);
    prodactInfoItem3.append(prodactInfoSpanItem3);
    prodactInfoItem4.append(prodactInfoSpanItem4);
    prodactInfoItem5.append(prodactInfoSpanItem5);
    prodactInfoItem6.append(prodactInfoSpanItem6);
    prodactInfoItem7.append(prodactInfoSpanItem7);
    buttonsContainer.append(addButton, buyButton);
    return moreinfoCardContainer;
  }
}