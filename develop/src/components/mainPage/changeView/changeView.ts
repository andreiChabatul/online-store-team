import { State } from '../../../State/State';
import { IComponentUpdate } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import './changeView.css';

export default class ChangeView implements IComponentUpdate {
    changeView: HTMLDivElement;

    constructor() {
        this.changeView = CreateElement.createDivElement('card-view-change');
    }
    render(): HTMLElement[] {
        const resultItem: HTMLElement[] = [];
        const changeViewTile = CreateElement.createDivElement('card-change card-change__tile', '', '', 'tile');
        const changeViewLine = CreateElement.createDivElement('card-change card-change__line', '', '', 'line');
        State.getBig()
            ? changeViewTile.classList.add('card-change_active')
            : changeViewLine.classList.add('card-change_active');
        resultItem.push(changeViewTile, changeViewLine);
        return resultItem;
    }
    clear(): void {
        this.changeView.innerHTML = '';
    }

    update(): void {
        this.clear();
        this.fill();
    }

    fill(): void {
        this.render().forEach((element) => {
            this.changeView.append(element);
        });
    }

    get(): HTMLDivElement {
        this.changeView.addEventListener('click', (e) => {
            const element = e.target as HTMLInputElement;
            const value = element.id;
            value === 'tile' ? State.setBig(true) : State.setBig(false);
        });
        this.fill();
        return this.changeView;
    }
}
