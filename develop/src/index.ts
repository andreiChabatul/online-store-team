import './global.css';
import '../src/assets/style/reset.css';
import '../src/assets/style/var.css';
import router from './router/router';

(async () => {
    window.addEventListener('DOMContentLoaded', function () {
        router.navigateTo(window.location.pathname + window.location.search);
    });
})();
