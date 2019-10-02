import Settings from './settings/Settings.js';

class StartGame {
    constructor({ generalConfig, gameInstance, swipperInstantion }) {
        this.generalConfig = generalConfig;
        this.startButton = document.querySelector(generalConfig.startButton);

        this.gameInstance = gameInstance;
        this.swipperInstantion = swipperInstantion;

        this.startButton.addEventListener('click', this.startGame);
    }

    startGame = () => {
        const { PanelConfig } = Settings;
        const settingsPage = new SettingsPanel(PanelConfig);

        // turn of page swipper
        this.swipperInstantion.changeScrollFlag(false);

        const settingsValues = settingsPage.geAllSettingsFromPage();
        //settingsPage validator (coming soon)
        if (!settingsValues.players.length) return;

        this.gameInstance.initialStartGame({
            ...settingsValues,
            ...this.generalConfig,
        });
        this.startButton.removeEventListener('click', this.startGame);
    };
}
export default StartGame;
