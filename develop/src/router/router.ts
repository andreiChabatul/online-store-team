import Router from '../../node_modules/vanilla-router/index';
import { open404, openBasket, openMain, openMoreInfo } from './functionRouter';

const router = new Router({
    mode: 'history',
    page404: open404,
});

router.add('', openMain);
router.add('cart', openBasket);
router.add(/^product-details\/([\d]{1,})/, openMoreInfo);
router.addUriListener();
export default router;
