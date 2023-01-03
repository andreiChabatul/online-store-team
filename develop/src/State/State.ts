import { IComponentUpdate, IFilter, IFilterNumber, IObjFilter, IPagination, IProduct, sortQuery } from '../types/index';
import {
    createFilter,
    createFilterNumber,
    filterWork,
    filterWorkNumber,
    pagination,
    search,
    updateUrlMain,
} from '../utils/AdditionalFunction';

class State {
    private data: IProduct[];
    private actions: IComponentUpdate[];
    private changeData: IProduct[];
    private filterCategory: IObjFilter;
    private filterBrand: IObjFilter;
    private filterPrice: number[];
    private filterStock: number[];
    private filter: IFilter;
    private filterNumber: IFilterNumber;
    private big: boolean;
    private sort: string;
    private search: string;
    private pagination: IPagination;

    constructor() {
        this.data = [];
        this.actions = [];
        this.changeData = [];
        this.filterCategory = {};
        this.filterBrand = {};
        this.filterPrice = [];
        this.filterStock = [];
        this.filter = {
            category: [],
            brand: [],
        };
        this.filterNumber = {
            price: [],
            stock: [],
        };
        this.big = false;
        this.sort = 'price-ASC';
        this.search = '';
        this.pagination = {
            amount: 8,
            selectPage: 0,
        };
    }

    getfilterBrand(): IObjFilter {
        return this.filterBrand;
    }

    getPagination(): IPagination {
        return this.pagination;
    }

    getfilterCategory(): IObjFilter {
        return this.filterCategory;
    }

    getFilter(): IFilter {
        return this.filter;
    }

    setSort(value: string) {
        this.sort = value;
        this.sortData();
    }

    getSort(): string {
        return this.sort;
    }

    setData(data: IProduct[]) {
        this.data = [...data];
        this.changeData = [...data];
        this.filterCategory = createFilter(this.data, 'category');
        this.filterBrand = createFilter(this.data, 'brand');
        this.filterPrice = createFilterNumber(this.data, 'price');
        this.filterStock = createFilterNumber(this.data, 'stock');
        this.filterFunc();
        this.sortData();
    }

    getFilterCategory() {
        return this.filterCategory;
    }

    sortData(): void {
        const arr: string[] = this.sort.split('-');
        let type: sortQuery = 'price';
        if (arr[0] === 'rating') {
            type = 'rating';
        } else if (arr[0] === 'discountPercentage') {
            type = 'discountPercentage';
        } else if (arr[0] === 'price') {
            type = 'price';
        }
        if (arr[1].toUpperCase() === 'ASC') {
            this.changeData.sort((a, b) => (a[type] > b[type] ? 1 : -1));
        } else {
            this.changeData.sort((a, b) => (a[type] < b[type] ? 1 : -1));
        }
        this.update();
    }

    resetFilter(): void {
        this.filter = {
            category: [],
            brand: [],
        };
        this.filterNumber = {
            price: [],
            stock: [],
        };
        this.search = '';
        this.sort = 'price-ASC';
        updateUrlMain.reset();
    }

    filterFunc(): void {
        let sortData: IProduct[] = this.data;
        sortData = filterWork(sortData, 'category', this.filter.category);
        sortData = filterWork(sortData, 'brand', this.filter.brand);
        sortData = filterWorkNumber(sortData, 'price', this.filterNumber.price);
        sortData = filterWorkNumber(sortData, 'stock', this.filterNumber.stock);
        this.search ? (sortData = search(sortData, this.search)) : '';
        this.pagination.selectPage = 0;
        this.changeData = sortData;
        this.update();
    }

    getData() {
        return this.changeData;
    }

    getDoneData() {
        return pagination(this.changeData, this.pagination);
    }

    getFilterBrand() {
        return this.filterBrand;
    }

    getFilterPrice(): number[] {
        return this.filterPrice;
    }

    getFilterStock(): number[] {
        return this.filterStock;
    }

    getSeacrh(): string {
        return this.search;
    }

    getAmountPage(): number {
        return Math.ceil(this.changeData.length / this.pagination.amount);
    }

    getBig(): boolean {
        return this.big;
    }

    getInitData() {
        return this.data;
    }

    setBig(boolean: boolean): void {
        this.big = boolean;
        this.update();
    }

    setSelectPage(id: string): void {
        this.pagination.selectPage = Number(id);
        this.update();
    }

    setSearch(query: string): void {
        this.search = query;
        this.filterFunc();
        this.update();
    }

    setSelectAmount(amount: string) {
        this.pagination.selectPage = 0;
        this.pagination.amount = Number(amount);
        this.update();
    }

    update() {
        return this.actions.forEach((subs) => subs.update());
    }

    setFilter(arr: IFilter) {
        this.filter = arr;
        this.filterFunc();
    }

    setFilterNumber(arr: number[], id: 'price' | 'stock') {
        this.filterNumber[id] = arr;
        this.filterFunc();
    }

    getFilterNumber(id: 'price' | 'stock') {
        return this.filterNumber[id];
    }

    register(...args: IComponentUpdate[]) {
        this.actions.push(...args);
    }
}

export default new State();
