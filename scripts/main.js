window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};
document.addEventListener('DOMContentLoaded', () => {
    let gameInstance = new Game();
    const settings = new SettingsPanel();
    const swipper = new Swipper();
    // on swipper
    swipper.changeScrollFlag(true);

    const startButton = document.querySelector('.settings__button--start');

    startGame = () => {
        // of swipper
        swipper.changeScrollFlag(false);
        const settingsValues = settings.geAllSettingsFromPage();
        console.log(settingsValues);

        //settings validator (coming soon)
        if (!settingsValues.players.length) return;

        gameInstance.initialStartGame(settingsValues);
        startButton.removeEventListener('click', startGame);
    };

    startButton.addEventListener('click', startGame);

    const loadImagesInstantion = new LoadImages();
    loadImagesInstantion.imagesPushFirst([
        './assets/images/logo.png',
        './assets/images/singleArrow.png',
        './assets/images/map.png',
    ]);
    loadImagesInstantion.loadSync();
});
