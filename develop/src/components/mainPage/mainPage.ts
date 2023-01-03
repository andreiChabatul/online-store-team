import State from '../../State/State';
import CreateElement from '../../utils/CreateElement';
import ChangeView from './changeView/changeView';
import fabricCardsMain from './fabricCardsMain/fabricCardsMain';
import FilterBlock from './filterBlock/filterBlock';
import FoundProduct from './foundBlock/foundBlock';
import PaginationFoot from './paginationFoot/paginationFoot';
import SelectAmount from './selectAmount/selectAmount';
import SortCard from './sortCard/SortCard';
import SearchCards from './searchCards/searchCard';
import { IComponentUpdate, IRenderComponent, IRenderComponentForm, IRenderComponentSelect } from '../../types/index';
import './mainPage.css';

export default class MainPage implements IRenderComponent {
    render(): HTMLDivElement {
        const mainPage = CreateElement.createDivElement('main-page');
        const cardContainer = CreateElement.createDivElement('card-container');
        const cardContainerHead = CreateElement.createDivElement('card-container__head');
        const cardWraper: IComponentUpdate = new fabricCardsMain();
        const sortCard: HTMLDivElement = new SortCard().render();
        const pagination: IComponentUpdate = new PaginationFoot();
        const selectAmount: IRenderComponentSelect = new SelectAmount();
        const foundProduct: IComponentUpdate = new FoundProduct();
        const changeView: IComponentUpdate = new ChangeView();
        const searchCard: IRenderComponentForm = new SearchCards();

        cardContainer.append(cardContainerHead, cardWraper.get(), pagination.get());
        cardContainerHead.append(
            sortCard,
            selectAmount.get(),
            foundProduct.get(),
            searchCard.render(),
            changeView.get()
        );
        mainPage.append(new FilterBlock().render(), cardContainer);
        State.register(foundProduct, pagination, changeView, cardWraper);
        return mainPage;
    }
}
