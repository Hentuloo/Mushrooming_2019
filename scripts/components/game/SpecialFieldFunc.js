class SpecialFieldFunc {
    constructor() {
        const _move = async (gameInstance, value) => {
            await gameInstance.movePlayerSync(value, true);
        };
        const _moveAgain = () => {
            this.listenThrowDice();
        };
        const _extraTurn = gameInstance => {
            // gameInstance._queue+=;
            gameInstance.listenThrowDice();
        };
        const _extraTurnForOther = (gameInstance, value, activePlayer) => {
            let otherPlayers = [];
            gameInstance.players.filter(player => {
                if (player.getId() !== activePlayer.getId()) {
                    otherPlayers.push({
                        userId: player.getId(),
                        extraTurn: true,
                    });
                }
            });
            gameInstance.setNextPlayerInQueue(otherPlayers);
            gameInstance.listenThrowDice();
        };
        const _lostMushrooms = (gameInstance, value, activePlayer) => {
            activePlayer.lostRandomMashrooms(value);
            gameInstance.newRound();
        };
        const _extraMushrooms = (gameInstance, value, activePlayer) => {
            activePlayer.extraMashrooms(
                value,
                gameInstance.Fields.getFieldTypes(),
            );
            gameInstance.newRound();
        };
        const _playerFinised = async (gameInstance, values, activePlayer) => {
            const placeGained = await gameInstance.dropPlayerFromQueue(
                activePlayer.getId(),
            );
            activePlayer.extraPoints(
                values.find(value => value.index === placeGained - 1).value,
            );
            gameInstance.gameEndCheck();
        };

        this.special = {
            move: (...args) => _move(...args),
            moveAgain: (...args) => _moveAgain(...args),
            extraTurn: (...args) => _extraTurn(...args),
            extraTurnForOther: (...args) => _extraTurnForOther(...args),
            lostMushrooms: (...args) => _lostMushrooms(...args),
            extraMushrooms: (...args) => _extraMushrooms(...args),
            playerFinised: (...args) => _playerFinised(...args),
        };
    }
}
