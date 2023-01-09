import { IComponentPopUpItem, IIsCheckInput, IsCheck } from '../../../../types/index';

class StatePopUp {
    private IsCheckInput: IIsCheckInput;
    private actions: IComponentPopUpItem[];

    constructor() {
        this.IsCheckInput = {
            name: false,
            phone: false,
            address: false,
            email: false,
            numberCard: false,
            dataCard: false,
            CVV: false,
        };
        this.actions = [];
    }

    setIsCheck(check: boolean, atr: IsCheck) {
        this.IsCheckInput[atr] = check;
    }

    getIsCheck(): boolean {
        let IsCheck = true;
        let key: IsCheck;
        for (key in this.IsCheckInput) {
            !this.IsCheckInput[key] ? (IsCheck = false) : '';
        }
        return IsCheck;
    }

    register(...args: IComponentPopUpItem[]) {
        this.actions.push(...args);
    }

    update(): void {
        this.actions.forEach((subs) => subs.update());
    }
}

export default new StatePopUp();
