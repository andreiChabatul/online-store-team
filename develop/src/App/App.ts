import State from '../State/State';
import { URL_API } from '../CONST/const';
import ApiLoader from '../utils/ApiLoader';
import InitPage from '../pages/initPage/initPage';
import Basket from '../components/basket/basket';
import MainPage from '../components/mainPage/mainPage';
import moreInfoCard from '../pages/moreInfo/moreInfo';
import NoProductsInfo from '../pages/moreInfo/noProductsInfo/noProductsInfo';

class App {
    initPage: InitPage;

    constructor() {
        this.initPage = new InitPage();
    }

    async run() {
        if (State.getInitData().length === 0) {
            const data = await ApiLoader.getData(URL_API);
            State.setData(data.products);
        }
        const mainPage = new MainPage();
        this.initPage.add(mainPage.render());
    }

    async updateInitPage(elem: HTMLDivElement) {
        this.initPage.add(elem);
    }

    async basketDone() {
        if (State.getInitData().length === 0) {
            const data = await ApiLoader.getData(URL_API);
            State.setData(data.products);
        }
        const basket = new Basket();
        this.initPage.add(basket.get());
    }

    async moreInfo(id: number) {
        if (State.getInitData().length === 0) {
            const data = await ApiLoader.getData(URL_API);
            State.setData(data.products);
        }
        let moreInfo: HTMLDivElement;
        id > State.getInitData().length
            ? (moreInfo = new NoProductsInfo(id).render())
            : (moreInfo = new moreInfoCard(State.getInitData()[id - 1]).render());
        this.initPage.add(moreInfo);
    }
}

export default new App();
