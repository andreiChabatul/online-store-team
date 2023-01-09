import StateBasket from '../components/basket/StateBasket';
import { SEARCH_FIELD } from '../CONST/const';
import { State } from '../State/State';
import {
    IProduct,
    IPagination,
    IBasket,
    IQueryPatametr,
    IObjFilter,
    IFilter,
    priceStock,
    brandCategory,
} from '../types/index';

export function sortCard(value: string): void {
    State.setSort(value);
    updateUrlMain.setString(value, 'sort');
}

export function filterCheck(atr: string, idParent: brandCategory) {
    const filter: IFilter = State.getFilter();
    filter[idParent].indexOf(atr) === -1
        ? filter[idParent].push(atr)
        : filter[idParent].splice(filter[idParent].indexOf(atr), 1);
    State.setFilter(filter);
    updateUrlMain.set(filter);
}

export function setFilter(atr: brandCategory, value: string): void {
    const result = value.split('%E2%86%95');
    result.forEach((element) => {
        filterCheck(element.replace(/%20/g, ' '), atr);
    });
    updateUrlMain.set(State.getFilter());
}

export function setFilterNumber(atr: priceStock, value: string): void {
    const result: number[] = value.split('%E2%86%95').map((i) => Number(i));
    result.sort((a, b) => a - b);
    State.setFilterNumber(result, atr);
    updateUrlMain.setPriceAndStock(result, atr);
}

export function createFilter(data: IProduct[], atr: brandCategory): IObjFilter {
    const obj: IObjFilter = {};

    data.forEach((element) => {
        if (element[atr] in obj) {
            obj[element[atr]]['quantity']++;
        } else {
            obj[element[atr]] = {
                name: element[atr],
                quantity: 1,
            };
        }
    });
    return obj;
}

export function filterWork(data: IProduct[], atr: brandCategory, filter: string[]): IProduct[] {
    let result: IProduct[] = [];
    if (filter.length > 0) {
        filter.forEach((filt) => {
            const resultElem: IProduct[] = data.filter((elem) => elem[atr] === filt);
            result = result.concat(resultElem);
        });
        return result;
    } else {
        return data;
    }
}

export function createFilterNumber(arr: IProduct[], atr: priceStock): number[] {
    let result: number[] = [];
    arr.forEach((element) => {
        result.push(element[atr]);
    });
    result.sort((a, b) => a - b);
    result.length === 1 ? (result = [result[0], result[0]]) : (result = [result.shift() || 0, result.pop() || 0]);
    return result;
}

export function filterWorkNumber(data: IProduct[], atr: priceStock, filter: number[]): IProduct[] {
    if (filter.length > 0) {
        const result: IProduct[] = [];
        data.forEach((element) => {
            if (element[atr] >= filter[0] && element[atr] <= filter[1]) {
                result.push(element);
            }
        });
        return result;
    } else {
        return data;
    }
}

export function searchEnter(value: string): void {
    State.setSearch(value.replace(/%20/g, ' '));
    updateUrlMain.setString(value, 'srch');
}

export function search(data: IProduct[], query: string): IProduct[] {
    const result: IProduct[] = [];
    SEARCH_FIELD.forEach((searchField) => {
        data.forEach((element) => {
            if (String(element[searchField]).toLowerCase().includes(query.toLowerCase())) {
                result.push(element);
            }
        });
    });
    return [...new Set(result)];
}

export function pagination<T>(data: T[], obj: IPagination): T[] {
    const init: number = obj.amount * obj.selectPage;
    const end: number = init + obj.amount;
    return data.slice(init, end);
}

export function addBasket(id: number): void {
    const price = State.getInitData()[id - 1].price;
    StateBasket.setBasket(id, price);
    State.update();
}

export function changeAmountFunc(id: string, obj: IBasket, stock: number): void {
    if (id[0] === '+') {
        if (obj.amount < stock) {
            obj.amount++;
        } else {
            obj.amount = stock;
        }
    } else {
        obj.amount--;
    }
    StateBasket.changeAmount();
    StateBasket.setPagePagination('update');
}

export function changeViewFunc(value: string | undefined) {
    if (value) {
        value === 'tile' ? State.setBig(true) : State.setBig(false);
        updateUrlMain.setChangeView(value);
    }
}

export function closeCart(obj: IBasket): void {
    obj.amount = 0;
    StateBasket.changeAmount();
    StateBasket.setPagePagination('update');
}

class AddBasketUrlParametr {
    limit: boolean | number;
    page: boolean | number;
    resultStr: string;

    constructor() {
        this.resultStr = '';
        this.limit = false;
        this.page = false;
    }

    set(query: string): void {
        query === 'limit' ? (this.limit = StateBasket.getPagination().amount) : '';
        query === 'page' ? (this.page = StateBasket.getPagination().selectPage + 1) : '';
        this.update();
    }

    update(): void {
        this.resultStr = '';
        this.resultStr = `${this.page ? `${this.resultStr.length === 0 ? '?' : '&'}page=${this.page}` : ''}`;
        this.resultStr += `${this.limit ? `${this.resultStr.length === 0 ? '?' : '&'}limit=${this.limit}` : ''}`;
        history.pushState({}, document.title, window.location.origin + window.location.pathname + this.resultStr);
    }

    reset(): void {
        this.limit = false;
        this.page = false;
    }
}

export function parserUrl(query: string) {
    const resultObj: IQueryPatametr = {};
    const arr: string[] = query.slice(1).split('&');
    arr.forEach((element) => {
        const index: number = element.indexOf('=');
        const indexObj: string = element.slice(0, index);
        const parametr: string = element.slice(index + 1);
        switch (indexObj) {
            case 'limit':
                resultObj[indexObj] = parametr;
                break;
            case 'page':
                resultObj[indexObj] = parametr;
                break;
            case 'search':
                resultObj[indexObj] = parametr;
                break;
            case 'sort':
                resultObj[indexObj] = parametr;
                break;
            case 'brand':
                resultObj[indexObj] = parametr;
                break;
            case 'category':
                resultObj[indexObj] = parametr;
                break;
            case 'price':
                resultObj[indexObj] = parametr;
                break;
            case 'stock':
                resultObj[indexObj] = parametr;
                break;
            case 'big':
                resultObj[indexObj] = parametr;
                break;
        }
    });
    return resultObj;
}

class AddMainUrlParametr {
    resultStr: string;
    result: IQueryPatametr;

    constructor() {
        this.result = {};
        this.resultStr = '';
    }

    reset() {
        this.result = {};
    }

    setChangeView(value: string) {
        this.result.big = `big=${value}`;
        this.update();
    }

    setString(query: string, atr: string) {
        switch (atr) {
            case 'sort':
                this.result.sort = `sort=${query}`;
                break;
            case 'srch':
                query ? (this.result.search = `search=${query}`) : delete this.result.search;
                break;
        }
        this.update();
    }

    setPriceAndStock(query: number[], atr: string) {
        switch (atr) {
            case 'price':
                this.result.price = `price=${query[0]}↕${query[1]}`;
                break;
            case 'stock':
                this.result.stock = `stock=${query[0]}↕${query[1]}`;
                break;
        }
        this.update();
    }

    set(query: IFilter) {
        query.brand.length > 0 ? (this.result.brand = `${'brand'}=${query.brand.join('↕')}`) : delete this.result.brand;
        query.category.length > 0
            ? (this.result.category = `${'category'}=${query.category.join('↕')}`)
            : delete this.result.category;
        this.update();
    }

    update() {
        const resultArr: string[] = [];
        const parametrQuery = Object.entries(this.result);
        parametrQuery.forEach((element) => {
            resultArr.push(element[1]);
        });
        resultArr.length > 0 ? (this.resultStr = '?') : (this.resultStr = '');
        this.resultStr += resultArr.join('&');
        history.replaceState({}, document.title, window.location.origin + this.resultStr);
    }
}

export const updateUrlMain = new AddMainUrlParametr();
export const updateUrl = new AddBasketUrlParametr();
