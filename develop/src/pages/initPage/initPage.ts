import Footer from '../../common-components/footer/footer';
import Header from '../../common-components/header/header';
import StateBasket from '../../components/basket/StateBasket';
import { BODY } from '../../CONST/const';
import { IComponentUpdate } from '../../types/index';
import CreateElement from '../../utils/CreateElement';

export default class InitPage implements InitPage {
    header: IComponentUpdate;
    main: HTMLDivElement;
    footer: HTMLDivElement;
    constructor() {
        this.main = CreateElement.createDivElement('main');
        this.header = new Header();
        this.footer = new Footer().render();
        StateBasket.register(this.header);
        BODY ? BODY.append(this.header.get(), this.main, this.footer) : '';
    }

    add(element: HTMLDivElement) {
        this.main.innerHTML = '';
        this.main.append(element);
    }
}
