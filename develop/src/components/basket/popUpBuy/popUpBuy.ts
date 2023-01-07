import { POP_UP } from '../../../CONST/const';
import { IComponentUpdate } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import StateBasket from '../StateBasket';
import CardCheckPopUp from './cardCheckPopUp/cardCheckPopUp';
import InputCheckPopUp from './inputCheckPopUp/inputCheckPopUp';
import LoadPay from './loadPay/loadPay';
import './popUpBuy.css';
import StatePopUp from './statePopUp/StatePopUp';

export default class PopUpBuy implements IComponentUpdate {
    popUpContainer: HTMLDivElement;

    constructor() {
        this.popUpContainer = CreateElement.createDivElement('pop-up__none');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        if (StateBasket.getIsBuyOpen()) {
            this.popUpContainer.classList.add('pop-up');
            const popUpBlack = CreateElement.createDivElement('pop-up__container_black');
            const popUp = CreateElement.createDivElement('pop-up__container');
            const popUpTitle = CreateElement.createParagraphElement('pop-up__title', 'Personal details');
            const popUpInput = CreateElement.createDivElement('pop-up__container_inputs');
            const buttonPay = CreateElement.createButtonElement('pop-up__button', 'pay for goods');
            const card = new CardCheckPopUp().get();
            POP_UP.forEach((element) => {
                const itemInput = new InputCheckPopUp(element, '80%', '25px');
                popUpInput.append(itemInput.render());
                StatePopUp.register(itemInput);
            });
            buttonPay.addEventListener('click', () => {
                StatePopUp.getIsCheck() ? this.openPay() : StatePopUp.update();
            });
            popUpBlack.addEventListener('click', () => {
                StateBasket.setIsBuyOpen(false);
                this.popUpContainer.innerHTML = '';
                this.popUpContainer.classList.add('pop-up__none');
                this.popUpContainer.classList.remove('pop-up');
            });
            popUp.append(popUpTitle, popUpInput);
            popUpInput.append(card, buttonPay);
            result.push(popUpBlack, popUp);
        }
        return result;
    }

    fill() {
        this.render().forEach((element) => {
            this.popUpContainer.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        return this.popUpContainer;
    }

    openPay() {
        const loadPay = new LoadPay().render();
        this.popUpContainer.append(loadPay);
    }
    update(): HTMLDivElement {
        this.fill();
        return this.popUpContainer;
    }
}
