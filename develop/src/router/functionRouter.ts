import App from '../App/App';
import StateBasket from '../components/basket/StateBasket';
import Page404 from '../pages/404/404';
import { IQueryPatametr } from '../types/index';
import { parserUrl, searchEnter, setFilter, setFilterNumber, sortCard } from '../utils/AdditionalFunction';

export function openBasket(): void {
    const query: string = window.location.search;
    const parametrs: IQueryPatametr = parserUrl(query);
    parametrs.page ? StateBasket.setPage(Number(parametrs.page) - 1) : '';
    parametrs.limit ? StateBasket.setLimitPagination(Number(parametrs.limit)) : '';
    App.basketDone();
}

export function openMain() {
    const query: string = window.location.search;
    const parametrs: IQueryPatametr = parserUrl(query);
    parametrs.search ? searchEnter(parametrs.search) : '';
    parametrs.sort ? sortCard(parametrs.sort) : '';
    parametrs.brand ? setFilter('brand', parametrs.brand) : '';
    parametrs.category ? setFilter('category', parametrs.category) : '';
    parametrs.price ? setFilterNumber('price', parametrs.price) : '';
    parametrs.stock ? setFilterNumber('stock', parametrs.stock) : '';
    App.run();
}

export function openMoreInfo() {
    const query: string = window.location.pathname;
    const parsQuery = Number(query.split('/').pop());
    App.moreInfo(parsQuery);
}

export function open404() {
    App.updateInitPage(new Page404().render());
}
