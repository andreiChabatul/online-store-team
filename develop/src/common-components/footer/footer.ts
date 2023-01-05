import CreateElement from '../../utils/CreateElement';
import rsIco from '../../assets/img/rsIco.png';
import gitIco from '../../assets/img/gitIco.png';
import './footer.css';
import { IRenderComponent } from '../../types/index';

export default class Footer implements IRenderComponent {
    render(): HTMLDivElement {
        const footer = CreateElement.createDivElement('footer-wraper');
        const footerIcoContainer = CreateElement.createDivElement('footer-wraper__container');
        const footerText = CreateElement.createParagraphElement(
            'footer-wraper__text',
            '@ 2023 The Rolling Scopes Online Store'
        );
        const footerRSIco = CreateElement.createDivElement('footer__ico ico');
        const footerRSImg = CreateElement.createImgElement('footer__ico-img ico_img', rsIco);
        const footerGitOneIco = CreateElement.createDivElement('footer__ico ico');
        const footerGitOneImg = CreateElement.createImgElement('footer__ico-img ico_img', gitIco);
        const footerGitTwoIco = CreateElement.createDivElement('footer__ico ico');
        const footerGitTwoImg = CreateElement.createImgElement('footer__ico-img ico_img', gitIco);
        footerRSIco.append(footerRSImg);
        footerGitOneIco.append(footerGitOneImg);
        footerGitTwoIco.append(footerGitTwoImg);
        footerRSIco.addEventListener('click', () => (window.location.href = 'https://rs.school/'));
        footerGitOneIco.addEventListener('click', () => (window.location.href = 'https://github.com/andreiChabatul'));
        footerGitTwoIco.addEventListener('click', () => (window.location.href = 'https://github.com/VEKozlov111'));
        footerIcoContainer.append(footerRSIco, footerGitOneIco, footerGitTwoIco);
        footer.append(footerText, footerIcoContainer);
        return footer;
    }
}
