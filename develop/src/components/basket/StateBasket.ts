import { IBasket, IComponentUpdate, IPagination, IPromoCode } from '../../types/index';
import { pagination } from '../../utils/AdditionalFunction';

class StateBasket {
    private basket: IBasket[];
    private promoCode: IPromoCode[];
    private pagination: IPagination;
    private actions: IComponentUpdate[];
    private finishPrice: number;
    private amountProducts: number;
    private discount: number;
    private IsBuyOpen: boolean;

    constructor() {
        this.basket = this.loadLocalStorage('basket_chabatul');
        this.promoCode = this.loadLocalStorage('promo_chabatul');
        this.pagination = this.loadLocalStoragePaganation('pagination_chabatul');
        this.actions = [];
        this.IsBuyOpen = false;
        this.finishPrice = 0;
        this.amountProducts = 0;
        this.discount = 1;
    }

    getPagination(): IPagination {
        return this.pagination;
    }

    getIsBuyOpen(): boolean {
        return this.IsBuyOpen;
    }

    setIsBuyOpen(value: boolean): void {
        this.IsBuyOpen = value;
        this.update();
    }

    getBasket(): IBasket[] {
        return this.basket;
    }

    getDoneBasket() {
        return pagination(this.basket, this.pagination);
    }

    getDiscount(): number {
        this.discount = 1;
        this.promoCode.forEach((element) => {
            element.discont ? (this.discount *= element.discont) : (this.discount = 1);
        });
        return this.discount;
    }

    getAmountProducts(): number {
        this.amountProducts = 0;
        this.basket.forEach((element) => {
            this.amountProducts += element.amount;
        });
        return this.amountProducts;
    }

    getFinishPrice(): number {
        this.finishPrice = 0;
        this.basket.forEach((element) => {
            this.finishPrice += element.amount * element.price;
        });
        return this.finishPrice;
    }

    getPromoCode(): IPromoCode[] {
        return this.promoCode;
    }

    setPromoCode(obj: IPromoCode): void {
        this.promoCode.push(obj);
        this.saveLocalStorage('promo_chabatul', this.promoCode);
        this.update();
    }

    delPromoCode(id: string): void {
        this.promoCode = this.promoCode.filter((elem) => elem.name != id);
        this.saveLocalStorage('promo_chabatul', this.promoCode);
        this.update();
    }

    getBasketId(): number[] {
        const BasketId: number[] = [];
        this.basket.forEach((element) => {
            BasketId.push(element.id);
        });
        return BasketId;
    }

    setLimitPagination(amount: number): void {
        amount && amount > 0 ? (this.pagination.amount = Number(amount)) : '';
        this.saveLocalStorage('pagination_chabatul', this.pagination);
        this.setPagePagination(this.pagination.selectPage);
        this.update();
    }

    setPage(page: number): void {
        let maxPage = Math.ceil(this.basket.length / this.pagination.amount) - 1;
        maxPage < 0 ? (maxPage = 0) : '';
        this.pagination.selectPage = page;
        this.pagination.selectPage < 0 ? (this.pagination.selectPage = 0) : '';
        this.pagination.selectPage > maxPage ? (this.pagination.selectPage = maxPage) : '';
        this.saveLocalStorage('pagination_chabatul', this.pagination);
    }

    setPagePagination(id: string | number): void {
        if (id) {
            if (id === 'nextPage') {
                this.pagination.selectPage++;
            } else if (id === 'prevPage') {
                this.pagination.selectPage--;
            }
        }
        this.setPage(this.pagination.selectPage);
        this.update();
    }

    setBasket(id: number, price: number): void {
        if (this.getBasketId().indexOf(id) === -1) {
            this.basket.push({ id: id, amount: 1, price: price });
        } else {
            this.basket.splice(this.getBasketId().indexOf(id), 1);
        }
        this.saveLocalStorage('basket_chabatul', this.basket);
        this.update();
    }

    saveLocalStorage(key: string, obj: IPagination | IBasket[] | IPromoCode[]): void {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    loadLocalStoragePaganation(key: string): IPagination {
        const result = localStorage.getItem(key);

        if (result !== null) {
            return JSON.parse(result);
        } else {
            return {
                amount: 2,
                selectPage: 0,
            };
        }
    }

    loadLocalStorage<T>(key: string): T[] {
        const result = localStorage.getItem(key);
        if (result !== null) {
            return JSON.parse(result);
        } else {
            return [];
        }
    }

    changeAmount(): void {
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].amount === 0) {
                this.basket.splice(i, 1);
            }
        }
        this.saveLocalStorage('basket_chabatul', this.basket);
        this.update();
    }

    clearBasket(): void {
        this.basket = [];
        this.IsBuyOpen = false;
        this.setPage(0);
        this.saveLocalStorage('basket_chabatul', this.basket);
        this.update();
    }

    update(): void {
        this.actions.forEach((subs) => subs.update());
    }

    register(...args: IComponentUpdate[]) {
        this.actions.push(...args);
    }
}

export default new StateBasket();
