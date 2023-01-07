import { IRenderComponent, IRenderComponentForm } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import StateBasket from '../StateBasket';
import ItemPromoCheck from './itemPromoCheck/itemPromoCheck';
import SearchPromo from './searchPromo/searchPromo';
import './promoBlock.css';

export default class PromoBlock implements IRenderComponent {
    render(): HTMLDivElement {
        const promoBlock = CreateElement.createDivElement('promo-container');
        const appliedCodes = CreateElement.createDivElement('promo-container__applied');
        const appliedCodesTitle = CreateElement.createDivElement('promo-applied__title', '', 'Applied codes');
        const searchPromo: IRenderComponentForm = new SearchPromo();
        const promoTextExample = CreateElement.createParagraphElement(
            'promo-applied__example',
            `Promo for test: 'RS', 'EPM'`
        );

        if (StateBasket.getPromoCode().length > 0) {
            appliedCodes.classList.add('promo-applied');
            appliedCodes.append(appliedCodesTitle);
            StateBasket.getPromoCode().forEach((element) => {
                const itemApplied = CreateElement.createDivElement('item-applied');
                const itemAppliedText = CreateElement.createParagraphElement('item-applied__text', element.text);
                const itemAppliedButton = CreateElement.createButtonElement(
                    'item-applied__button',
                    'DROP',
                    element.name
                );
                itemAppliedButton.addEventListener('click', (e) => {
                    const element = e.currentTarget as HTMLInputElement;
                    const value = element.id;
                    StateBasket.delPromoCode(value);
                });
                itemApplied.append(itemAppliedText, itemAppliedButton);
                appliedCodes.append(itemApplied);
            });
        }
        promoBlock.append(appliedCodes, searchPromo.render(), ItemPromoCheck.get(), promoTextExample);
        return promoBlock;
    }
}
