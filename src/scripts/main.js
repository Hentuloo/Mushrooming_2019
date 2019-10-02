import '../stylesheets/main.scss';

import Settings from './settings/Settings.js';
import StartGame from './StartGame.js';

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
        initialGameSettings,
        gifConfig,
        batleMapConfig,
        diceConfig,
        alertConfig,
        pawnConfig,
        mapSwipeMoveConfig,
    } = Settings;

    // turn on swipper
    const swipperInstantion = new Swipper(swiperConfig);
    swipperInstantion.changeScrollFlag(true);

    //turn on page swipe on map(movment map)
    new MapSwipeMove(mapSwipeMoveConfig);

    //load all images in first that:
    const loadImagesInstantion = new LoadImages();
    loadImagesInstantion.imagesPushFirst([
        './assets/images/logo.png',
        './assets/images/singleArrow.png',
        './assets/images/map.png',
    ]);
    loadImagesInstantion.loadSync();

    let gameInstance = new Game({
        gifConfig,
        batleMapConfig,
        diceConfig,
        alertConfig,
        initialGameSettings,
        pawnConfig,
    });

    new StartGame({ generalConfig, gameInstance, swipperInstantion });
});
