import CreateElement from '../../../../utils/CreateElement';
import payDone from '../../../../assets/img/payDone.png';
import './loadPay.css';
import StateBasket from '../../StateBasket';
import router from '../../../../router/router';

export default class LoadPay {
    containerLoad: HTMLDivElement;
    payExcelentText: HTMLParagraphElement;
    second: number;

    constructor() {
        this.second = 5;
        this.containerLoad = CreateElement.createDivElement('loadPay-container');
        this.payExcelentText = CreateElement.createParagraphElement(
            'loadPay-container__excelent_text',
            `Thanks for your order. Redirect to the store after ${this.second} sec`
        );
    }

    render(): HTMLDivElement {
        const payExcelent = CreateElement.createDivElement('loadPay-container__excelent');
        const payExcelentImg = CreateElement.createImgElement('loadPay-container__excelent_img', payDone);
        const timer = setInterval(() => this.update(), 1000);
        payExcelent.append(payExcelentImg, this.payExcelentText);
        this.containerLoad.append(payExcelent);
        setTimeout(() => {
            clearInterval(timer);
            StateBasket.clearBasket();
            router.navigateTo('');
        }, 5000);
        return this.containerLoad;
    }

    update() {
        this.second--;
        this.payExcelentText.textContent = `Thanks for your order. Redirect to the store after ${this.second} sec`;
    }
}
