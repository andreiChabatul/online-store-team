import { eventsInput } from '../../../../CONST/const';
import { IPopUpItem } from '../../../../types/index';
import CreateElement from '../../../../utils/CreateElement';
import StatePopUp from '../statePopUp/StatePopUp';
import './inputCheckPopUp.css';

export default class InputCheckPopUp {
    obj: IPopUpItem;
    Ischeck: boolean;
    inputContainer: HTMLDivElement;
    textResult: HTMLParagraphElement;
    input: HTMLInputElement;
    width: string;
    height: string;

    constructor(obj: IPopUpItem, width: string, height: string) {
        this.obj = obj;
        this.Ischeck = false;
        this.width = width;
        this.height = height;
        this.input = CreateElement.createInputElement('input-popUp__input', this.obj.placeHolder, this.obj.name);
        this.inputContainer = CreateElement.createDivElement('input-popUp-container');
        this.textResult = CreateElement.createParagraphElement('input-popUp-container__text');
        this.inputContainer.style.width = this.width;
        this.input.style.height = this.height;
    }

    render(): HTMLDivElement {
        const formInput = CreateElement.createFormElement('input-popUp__form');
        const inputReset = CreateElement.createButtonElement('input-popUp__reset', '', '', 'reset');
        this.input.setAttribute('maxlength', this.obj.maxLenght);
        for (const event in eventsInput) {
            this.input.addEventListener(
                eventsInput[event],
                (e) => {
                    inputReset.classList.add('input-popUp__reset_active');
                    this.check(this.input.value);
                    this.obj.name === 'CVV' || this.obj.name === 'numberCard' || this.obj.name === 'dataCard'
                        ? this.replaceChar(e)
                        : '';
                },
                false
            );
        }
        inputReset.addEventListener('click', () => {
            this.input.value = '';
            inputReset.classList.remove('input-popUp__reset_active');
            this.check('');
        });
        formInput.append(this.input, inputReset);
        this.inputContainer.append(formInput, this.textResult);
        return this.inputContainer;
    }

    check(value: string): void {
        value.search(this.obj.regEx) > -1 ? (this.Ischeck = true) : (this.Ischeck = false);
        StatePopUp.setIsCheck(this.Ischeck, this.obj.name);
        this.update();
    }

    replaceChar(e: Event) {
        const element = e.currentTarget as HTMLInputElement;
        const value = element.value;
        let codeCard: string | undefined = value.replace(/[^\d]/g, '').substring(0, element.maxLength);
        switch (element.id) {
            case 'numberCard': {
                codeCard = codeCard !== '' ? codeCard.match(/.{1,4}/g)?.join(' ') : '';
                break;
            }
            case 'dataCard': {
                codeCard = codeCard !== '' ? codeCard.match(/.{1,2}/g)?.join('/') : '';
                break;
            }
        }
        element.value = codeCard || '';
    }

    getInput(): HTMLInputElement {
        return this.input;
    }

    update(): void {
        enum checkText {
            correct = '✓ Correct input',
            incorrect = '✖ Incorrect input',
        }
        if (this.Ischeck) {
            this.textResult.textContent = checkText.correct;
            this.textResult.classList.remove('input-popUp-container__text_incorrect');
            this.input.classList.remove('input-popUp__input_incorrect');
            this.textResult.classList.add('input-popUp-container__text_correct');
            this.input.classList.add('input-popUp__input_correct');
        } else {
            this.textResult.textContent = checkText.incorrect;
            this.textResult.classList.remove('input-popUp-container__text_correct');
            this.input.classList.remove('input-popUp__input_correct');
            this.textResult.classList.add('input-popUp-container__text_incorrect');
            this.input.classList.add('input-popUp__input_incorrect');
        }
    }
}
