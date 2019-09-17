class SettingsPanel {
    constructor() {
        this.players = [...document.querySelectorAll('.settings__player')];
        this.game = document.querySelector('.settings__game');

        this.playersKeyButtons = [
            ...document.querySelectorAll('.settings__player-keyCode'),
        ];

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

            const active = player.querySelector('.settings__player-checkbox');
            if (active.checked) {
                const color = player.querySelector('.settings__player-color')
                    .dataset.value;
                const nick = player.querySelector('.settings__player-name')
                    .value;
                const type = player.querySelector('.settings__player-types')
                    .value;
                const keyCode = player.querySelector(
                    '.settings__player-keyCode',
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
        const speed = this.game.querySelector('#settings__spead-select').value;
        const type = this.game.querySelector('#settings__mood-select').value;
        const specialEffects = this.game.querySelector(
            '#settings__effects-select',
        ).value;
        return { speed, type, special: specialEffects == 'true' };
    };
    geAllSettingsFromPage = () => ({
        settings: this.gameSettings(),
        players: this.playersSettings(),
    });

    chooseKeyClicked = element => {
        element.innerText = 'Wybierz klawisz';

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
