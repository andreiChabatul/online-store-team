import router from '../../router/router';
import CreateElement from '../../utils/CreateElement';
import './404.css';

export default class Page404 {
    render() {
        const container = CreateElement.createDivElement('container-404');
        const titlePage = CreateElement.createParagraphElement('container-404_text', 'PAGE NOT FOUND (404)');
        const goHomeButton = CreateElement.createButtonElement('page_button', 'go home');
        goHomeButton.addEventListener('click', () => router.navigateTo(''));
        container.append(titlePage, goHomeButton);
        return container;
    }
}
