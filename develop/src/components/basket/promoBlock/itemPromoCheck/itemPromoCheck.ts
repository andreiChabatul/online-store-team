import { PROMO_CODE } from '../../../../CONST/const';
import { IComponentUpdate, IPromoCode } from '../../../../types/index';
import CreateElement from '../../../../utils/CreateElement';
import StateBasket from '../../StateBasket';
import './itemPromoCheck.css';

class ItemPromoCheck implements IComponentUpdate {
    ItemPromoCheck: HTMLDivElement;
    obj: IPromoCode;
    value: string;

    constructor() {
        this.ItemPromoCheck = CreateElement.createDivElement('promo_closeActive');
        this.obj = {};
        this.value = '';
    }

    render() {
        const result: HTMLElement[] = [];
        if (Object.keys(this.obj).length > 0) {
            this.ItemPromoCheck.classList.remove('promo_closeActive');
            this.ItemPromoCheck.classList.add('promo-check');
            let IsAdd = true;
            const itemCheckText = CreateElement.createParagraphElement('item-applied__text', this.obj.text);
            result.push(itemCheckText);

            StateBasket.getPromoCode().forEach((element) => {
                if (element.name === this.obj.name) {
                    IsAdd = false;
                }
            });
            if (IsAdd) {
                const itemCheckButton = CreateElement.createButtonElement('item-applied__button', 'ADD', this.obj.name);
                const objAdd = this.obj;
                itemCheckButton.addEventListener('click', () => StateBasket.setPromoCode(objAdd));
                result.push(itemCheckButton);
            }
            this.obj = {};
        }
        return result;
    }

    check(value: string): void {
        this.ItemPromoCheck.classList.remove('promo-check');
        this.value = value;
        PROMO_CODE.forEach((element) => {
            if (element.name === this.value.toUpperCase()) {
                this.obj = element;
            }
        });
        this.clear();
        this.fill();
    }

    update() {
        this.ItemPromoCheck.classList.add('promo_closeActive');
    }

    clear(): void {
        this.ItemPromoCheck.innerHTML = '';
    }

    fill(): void {
        this.render().forEach((element) => {
            this.ItemPromoCheck.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        return this.ItemPromoCheck;
    }
}

export default new ItemPromoCheck();
