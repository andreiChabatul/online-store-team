import { IComponentUpdate, IRenderComponent } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import PromoBlock from '../promoBlock/promoBlock';
import StateBasket from '../StateBasket';
import './summary.css';

export class Summary implements IComponentUpdate {
    summaryContainer: HTMLDivElement;
    constructor() {
        this.summaryContainer = CreateElement.createDivElement('summary-container');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        const summaryTitle = CreateElement.createParagraphElement('summary-container__title', 'Summary');
        const summaryAmountProducts = CreateElement.createDivElement('summary-container__products');
        const summaryAmountTitle = CreateElement.createSpanElement('summary-container__products_title', 'Products: ');
        const summaryAmountAmount = CreateElement.createSpanElement(
            'summary-container__products_amount',
            StateBasket.getAmountProducts()
        );
        const summaryTotal = CreateElement.createDivElement('summary-container__products');
        const summaryTotalTitle = CreateElement.createSpanElement('summary-container__products_title', 'Total: $');
        const summaryTotalPrice = CreateElement.createSpanElement(
            'summary-container__products_amount',
            StateBasket.getFinishPrice().toFixed(2)
        );
        const summaryDiscont = CreateElement.createDivElement(
            'summary-container__products summary-container__discont_inActive'
        );
        const summaryDiscontTitle = CreateElement.createSpanElement('summary-container__products_title', 'Total: $');
        const summaryDiscontPrice = CreateElement.createSpanElement(
            'summary-container__products_amount',
            (StateBasket.getFinishPrice() * StateBasket.getDiscount()).toFixed(2)
        );
        const promoBlock: IRenderComponent = new PromoBlock();
        const buyButton = CreateElement.createButtonElement('summary-container__buy', 'buy now');

        if (StateBasket.getPromoCode().length > 0) {
            summaryDiscont.classList.remove('summary-container__discont_inActive');
            summaryTotal.classList.add('summary-container__price_close');
        }

        buyButton.addEventListener('click', () => {
            StateBasket.getBasket().length > 0 ? StateBasket.setIsBuyOpen(true) : '';
        });

        summaryTotal.append(summaryTotalTitle, summaryTotalPrice);
        summaryAmountProducts.append(summaryAmountTitle, summaryAmountAmount);
        summaryDiscont.append(summaryDiscontTitle, summaryDiscontPrice);
        result.push(summaryTitle, summaryAmountProducts, summaryTotal, summaryDiscont, promoBlock.render(), buyButton);
        return result;
    }

    clear(): void {
        this.summaryContainer.innerHTML = '';
    }

    fill(): void {
        this.render().forEach((element) => {
            this.summaryContainer.append(element);
        });
    }

    update(): void {
        this.clear();
        this.fill();
    }

    get(): HTMLDivElement {
        this.fill();
        return this.summaryContainer;
    }
}
