import '../stylesheets/main.scss';

import Settings from './settings/Settings.js';
import StartGame from './StartGame.js';

import LoadingPage from './components/LoadingPage.js';
import Swipper from './components/Swipper.js';
import MapSwipeMove from './components/game/MapSwipeMove.js';
import LazyLoad from './components/LazyLoad.js';
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
        videoConfig,
        batleMapConfig,
        diceConfig,
        alertConfig,
        pawnConfig,
        mapSwipeMoveConfig,
        lazyLoadConfig,
    } = Settings;

    const loadingPage = new LoadingPage(LoadingPageConfig);

    // turn on swipper
    const swipperInstantion = new Swipper(swiperConfig);
    swipperInstantion.changeScrollFlag(true);

    //turn on page swipe on map(movment map)
    new MapSwipeMove(mapSwipeMoveConfig);

    //load all images in first that:
    const LazyLoadInstantion = new LazyLoad({
        ...lazyLoadConfig,
        closeTrigger: LoadingPageConfig.trigger,
        closeLoadingPage: loadingPage.close,
    });
    LazyLoadInstantion.imagesPushFirst();
    LazyLoadInstantion.loadSync();

    let gameInstance = new Game({
        videoConfig,
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
