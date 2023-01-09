import { CARD_IMG, POP_UP_CARD } from '../../../../CONST/const';
import CreateElement from '../../../../utils/CreateElement';
import InputCheckPopUp from '../inputCheckPopUp/inputCheckPopUp';
import StatePopUp from '../statePopUp/StatePopUp';
import './cardCheckPopUp.css';

export default class CardCheckPopUp {
    containerCard: HTMLDivElement;
    imgCard: HTMLImageElement;
    itemCard: number;

    constructor() {
        this.containerCard = CreateElement.createDivElement('popup-card-container');
        this.imgCard = CreateElement.createImgElement('popup-card-container__img');
        this.itemCard = 0;
    }

    render() {
        const cardNumberInput = new InputCheckPopUp(POP_UP_CARD[0], '200px', '20px');
        const cvvInput = new InputCheckPopUp(POP_UP_CARD[2], '50px', '20px');
        const dataInput = new InputCheckPopUp(POP_UP_CARD[1], '60px', '20px');
        const cardNumberInputDiv = cardNumberInput.render();
        const cvvInputDiv = cvvInput.render();
        const dataInputDiv = dataInput.render();
        const inputNumber = cardNumberInput.getInput();
        StatePopUp.register(cardNumberInput, cvvInput, dataInput);
        cvvInputDiv.classList.add('popup-card-container__cvv');
        cardNumberInputDiv.classList.add('popup-card-container__number');
        dataInputDiv.classList.add('popup-card-container__data');
        this.containerCard.append(this.imgCard, cardNumberInputDiv, cvvInputDiv, dataInputDiv);
        this.imgCard.src = CARD_IMG[this.itemCard];
        inputNumber.addEventListener('input', () => this.updateImgCart(inputNumber.value));
    }

    updateImgCart(value: string) {
        const index = value[0];
        if (index === '1' || index === '2' || index === '3') {
            this.itemCard = 0;
        } else if (index === '4' || index === '5' || index === '6') {
            this.itemCard = 1;
        } else if (index === '7' || index === '8' || index === '9') {
            this.itemCard = 2;
        }
        this.imgCard.src = CARD_IMG[this.itemCard];
    }

    get(): HTMLDivElement {
        this.render();
        return this.containerCard;
    }
}
