class SettingsPanel {
    constructor({
        players,
        game,
        keyButtons,
        checkboxClass,
        colorClass,
        nickClass,
        typeClass,
        keyCodeClass,
        speedClass,
        gameTypeClass,
        specialEffectsClass,
        keyButtonDefault,
    }) {
        this.containerClassses = {
            checkboxClass,
            colorClass,
            nickClass,
            typeClass,
            keyCodeClass,
            speedClass,
            gameTypeClass,
            specialEffectsClass,
            keyButtonDefault,
        };

        this.players = players;
        this.game = game;

        this.playersKeyButtons = keyButtons;

        this.playersKeyButtons.forEach(playerButton =>
            playerButton.addEventListener('click', () =>
                this.chooseKeyClicked(playerButton),
            ),
        );
    }
    playersSettings = () => {
        let players = [];
        this.players.forEach(player => {
            // find unique id
            let uniqueId = false;
            let id = null;
            do {
                id = Math.floor(Math.random() * 100);
                uniqueId = players.find(player => player.id === id);
            } while (uniqueId !== undefined);

            const active = player.querySelector(
                this.containerClassses.checkboxClass,
            );
            if (active.checked) {
                const color = player.querySelector(
                    this.containerClassses.colorClass,
                ).dataset.value;
                const nick = player.querySelector(
                    this.containerClassses.nickClass,
                ).value;
                const type = player.querySelector(
                    this.containerClassses.typeClass,
                ).value;
                const keyCode = player.querySelector(
                    this.containerClassses.keyCodeClass,
                ).dataset.keyCode;
                players.push({
                    id,
                    color,
                    nick,
                    type,
                    keyCode: keyCode || false,
                });
            }
        });
        return players;
    };
    gameSettings = () => {
        const speed = this.game.querySelector(this.containerClassses.speedClass)
            .value;
        const type = this.game.querySelector(
            this.containerClassses.gameTypeClass,
        ).value;
        const specialEffects = this.game.querySelector(
            this.containerClassses.specialEffectsClass,
        ).value;
        return { speed, type, special: specialEffects == 'true' };
    };
    geAllSettingsFromPage = () => ({
        settings: this.gameSettings(),
        players: this.playersSettings(),
    });

    chooseKeyClicked = element => {
        element.innerText = this.containerClassses.keyButtonDefault;

        const myListener = event => {
            window.removeEventListener('keydown', myListener);
            this.chooseKey(event, element);
        };
        window.addEventListener('keydown', myListener);
    };
    chooseKey = (event, element) => {
        element.innerText = event.key;
        element.dataset.keyCode = event.keyCode;
    };
}
