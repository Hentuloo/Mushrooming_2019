import '../stylesheets/main.scss';

import Settings from './settings/Settings.js';
import StartGame from './StartGame.js';

import LoadingPage from './components/LoadingPage.js';
import Swipper from './components/Swipper.js';
import MapSwipeMove from './components/game/MapSwipeMove.js';
import LoadImages from './components/LoadImages.js';
import Game from './components/game/Game.js';

window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};
document.addEventListener('DOMContentLoaded', () => {
    const {
        swiperConfig,
        generalConfig,
        LoadingPageConfig,
        initialGameSettings,
        gifConfig,
        batleMapConfig,
        diceConfig,
        alertConfig,
        pawnConfig,
        mapSwipeMoveConfig,
        loadImagesConfig,
    } = Settings;

    const loadingPage = new LoadingPage(LoadingPageConfig);

    // turn on swipper
    const swipperInstantion = new Swipper(swiperConfig);
    swipperInstantion.changeScrollFlag(true);

    //turn on page swipe on map(movment map)
    new MapSwipeMove(mapSwipeMoveConfig);

    //load all images in first that:
    const loadImagesInstantion = new LoadImages({
        ...loadImagesConfig,
        closeTrigger: LoadingPageConfig.trigger,
        closeLoadingPage: loadingPage.close,
    });
    loadImagesInstantion.imagesPushFirst(loadImagesConfig.firstInQueue);
    loadImagesInstantion.loadSync();

    let gameInstance = new Game({
        gifConfig,
        batleMapConfig,
        diceConfig,
        alertConfig,
        initialGameSettings,
        pawnConfig,
    });

    new StartGame({
        generalConfig,
        gameInstance,
        swipperInstantion,
        openLoadingPage: loadingPage.open,
        closeLoadingPage: loadingPage.close,
    });
});
