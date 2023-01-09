import { IBasket, IRenderComponent } from '../../../types/index';
import { changeAmountFunc } from '../../../utils/AdditionalFunction';
import CreateElement from '../../../utils/CreateElement';
import './productsAmount.css';

export default class AmountProduct implements IRenderComponent {
    amountContainer: HTMLDivElement;
    obj: IBasket;
    stock: number;

    constructor(obj: IBasket, stock: number) {
        this.obj = obj;
        this.stock = stock;
        this.amountContainer = CreateElement.createDivElement('amount_container');
    }

    render(): HTMLDivElement {
        const priceFinish: number = this.obj.amount * this.obj.price;
        const stock = CreateElement.createParagraphElement('amount__stock', `Stock: ${this.stock}`);
        const blockChangeAmount = CreateElement.createDivElement('amount__change');
        const blockFinishPrice = CreateElement.createParagraphElement('amount__price', `$ ${priceFinish}`);
        const changeAmountMinus = CreateElement.createParagraphElement('amount__change_change', '+', '+amount');
        const changeAmount = CreateElement.createParagraphElement('change__container', this.obj.amount);
        const changeAmountPlus = CreateElement.createParagraphElement('amount__change_change', '-', '-amount');
        blockChangeAmount.append(changeAmountPlus, changeAmount, changeAmountMinus);

        blockChangeAmount.addEventListener('click', (e) => {
            const element = e.target as HTMLInputElement;
            const value = element.id;
            changeAmountFunc(value, this.obj, this.stock);
            e.stopPropagation();
        });

        this.amountContainer.append(stock, blockChangeAmount, blockFinishPrice);
        return this.amountContainer;
    }
}
