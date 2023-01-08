import { IRenderComponent } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import './noProductsInfo.css';

export default class NoProductsInfo implements IRenderComponent {
    id: number;
    constructor(id: number) {
        this.id = id;
    }

    render(): HTMLDivElement {
        const containerNoFound = CreateElement.createDivElement('container-noFounds');
        const textNoFound = CreateElement.createParagraphElement(
            'container-noFounds__text',
            `Product number ${this.id} not found`
        );
        containerNoFound.append(textNoFound);
        return containerNoFound;
    }
}
