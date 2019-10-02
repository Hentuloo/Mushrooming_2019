class Game {
    constructor({
        gifConfig,
        batleMapConfig,
        diceConfig,
        alertConfig,
        initialGameSettings,
        pawnConfig,
    }) {
        // INITIAL SECTION - START

        //load fields
        this.Fields = new Fields(fieldsInit);
        //load gift component
        const _GifAlert = new GifAlert(gifConfig);
        //load map
        const _BattleMap = new BattleMap({
            ...batleMapConfig,
            fieldsInstantion: this.Fields.getAllProp(),
        });
        //load dice
        const _Dice = new Dice(diceConfig);
        //load special functions for special fields
        const _SpecialEffectsFunctions = new SpecialFieldFunc();
        //load Alert component
        const _Alert = new Alert(alertConfig);
        //users
        this.players;
        let _activePlayer;

        //First queue
        let _queue;

        let diceThrowedDelay = initialGameSettings.diceThrowedDelay;
        const newRoundDelay = initialGameSettings.newRoundDelay;
        let _gameType = initialGameSettings.gameType;

        //flag to signalize that next round can be call
        let _activeRound = true;
        let currentFieldSpecial;
        // INITIAL SECTION - END

        //initial game function (onclick start button in main.js)
        this.initialStartGame = ({
            settings,
            players,
            interfaceBar,
            gameSettings: {
                gameContainer,
                gameMapContainer,
                mapOnlyClass,
                startedClass,
            },
            arrowSettings: { arrowButton, hideClass },
        }) => {
            //change map motive
            gameContainer.classList.remove(mapOnlyClass);
            gameContainer.classList.add(startedClass);

            arrowButton.classList.add(hideClass);

            //reset transform
            gameMapContainer.style.transform = 'translate(0px,0px)';

            //get players
            this.players = players.map(
                player =>
                    new Pawn({
                        player,
                        interfaceWrapper: interfaceBar,
                        fieldsWrappers: _BattleMap.fieldsWrappers,
                        gameSpeed: settings.speed,
                        ...pawnConfig,
                    }),
            );
            this.players.forEach(player => {
                player.drawPawn();
                player.updateStatPanel();
            });

            _queue = players.map(el => ({
                userId: el.id,
            }));

            //when gifs aren't enable change diceThrowedDelay
            _GifAlert.changeEnable(settings.special);
            _Dice.changeNumberFlag(!settings.special);
            diceThrowedDelay = settings.special ? diceThrowedDelay : 300;

            _gameType = settings.type;
            //start game
            this.newRound();
        };

        this.setNextPlayerInQueue = playersWithExrtraTurn => {
            //push players with extraTurn to _quque
            if (playersWithExrtraTurn) {
                _queue.unshift(...playersWithExrtraTurn);
            }
            //take first user from queue and add to end of queue
            const firstUserInQueue = _queue[0];
            //if it is extra turn: only shift from queue
            if (firstUserInQueue.extraTurn) {
                _queue.shift();
            } else {
                _queue.shift();
                _queue.push(firstUserInQueue);
            }

            //find player instance
            this.players.forEach(player => {
                if (player.getId() === firstUserInQueue.userId) {
                    player.activeStatus(true);
                    _activePlayer = player;
                    player.updateStatPanel();
                    return;
                }
                player.activeStatus(false);
                player.updateStatPanel();
            });
        };
        this.listenThrowDice = () => {
            if (_activePlayer.getType() === 'computer') {
                _Dice.diceSwitchStatus(true);
                return this.DiceThrowed();
            }
            //on a dice listener ( onclick=> dispatch(throwDice)) || on keydown
            _Dice.diceSwitchStatus(true);
            const events = [
                'throwDice',
                `throwDiceUser-${_activePlayer.getId()}`,
            ];
            events.forEach(e => document.addEventListener(e, this.DiceThrowed));
        };
        this.DiceThrowed = () => {
            //remove throwDice listener
            this.removeDiceThrowEventListener();
            //throw dice and off
            _Dice.throw();
            _Dice.diceSwitchStatus(false);
            //show alert with number
            _GifAlert.newRandomGift({
                gifGroup: 'diceThrow',
                modifier: 'normal',
                number: _Dice.getNumber(),
            });
            //move
            setTimeout(() => this.movePlayerSync(), diceThrowedDelay);
        };
        this.movePlayerSync = async moveNumber => {
            //move pawn sync (dice random number)
            await _activePlayer.moveSync(moveNumber || _Dice.getNumber());
            const playerNumberOfField = _activePlayer.activeFieldNumber();

            //return specify field properties
            const currentField = this.Fields.checkField(playerNumberOfField);
            const { type, gifGroup, lastField } = currentField;

            //check the type of field
            if (type === 'natural') {
                _activeRound = true;
            } else if (type === 'special') {
                //change flag because special function can may last longer(addeventListener)
                _activeRound = false;
                //show alert with css-modifier
                _GifAlert.newRandomGift({
                    gifGroup,
                    modifier: 'with-alert',
                });

                if (lastField) {
                    if (_gameType === 'firstWin') {
                        return this.gameEndCheck();
                    }
                    _Alert.newAlert(currentField);
                } else {
                    _Alert.newAlert(currentField);
                }
                //show alert

                currentFieldSpecial = currentField;
                //when alert was accept
                document.addEventListener(
                    'specialFieldAlertAccept',
                    this.specialFieldRunFunc,
                );
            } else if (
                type === 'mushroomGood' ||
                type === 'raspberry' ||
                type === 'mushroomWrong'
            ) {
                const { value, index } = currentField;

                if (gifGroup && value) {
                    _GifAlert.newRandomGift({
                        gifGroup,
                        modifier: 'plant-field',
                    });
                }

                _activePlayer.newItem(type, value, this.Fields.getFieldTypes());
                this.Fields.clearItemsFromField(index);
                _activeRound = true;
            }
            if (_activeRound) this.newRound();
        };
        this.newRound = () => {
            setTimeout(() => {
                this.setNextPlayerInQueue();
                _activeRound = false;
                this.listenThrowDice();
            }, newRoundDelay);
        };

        this.removeDiceThrowEventListener = () => {
            const events = [
                'throwDice',
                `throwDiceUser-${_activePlayer.getId()}`,
            ];
            events.forEach(e =>
                document.removeEventListener(e, this.DiceThrowed),
            );
        };
        this.specialFieldRunFunc = () => {
            //remove specialFieldAlertAccept listener
            this.removeListener(
                'specialFieldAlertAccept',
                this.specialFieldRunFunc,
            );
            //do special function
            const { action, value } = currentFieldSpecial;
            _SpecialEffectsFunctions.special[action](
                this,
                value,
                _activePlayer,
            );
        };

        //drop player (when finish)
        this.dropPlayerFromQueue = id => {
            _queue = _queue.filter(player => player.userId !== id);
            //return place gained
            return this.players.length - _queue.length;
        };

        this.gameEndCheck = () => {
            if (_queue.length === 0 || _gameType === 'firstWin') {
                //if queue is empty = game end
                const results = this.players.map(player => {
                    return {
                        name: player.getName(),
                        points: player.getPointsNumber(),
                    };
                });
                results.sort((a, b) => {
                    return b.points - a.points;
                });

                //if game type is: first won
                if (_gameType === 'firstWin') {
                    _Alert.gameEndAlert({
                        results,
                        firstWon: _activePlayer.getName(),
                    });
                } else {
                    _Alert.gameEndAlert({ result });
                }
                document.addEventListener(
                    'specialFieldAlertAccept',
                    this.resetGameFunction,
                );
            } else {
                this.newRound();
            }
        };

        this.resetGameFunction = () => {
            this.removeListener(
                'specialFieldAlertAccept',
                this.resetGameFunction,
            );

            this.Fields.resetFields();
            _BattleMap.refreshMap();

            //reset players and _queue
            _queue = this.players.map(player => {
                player.reset();
                return { userId: player.getId() };
            });

            this.newRound();
        };
        this.removeListener = (name, func) => {
            document.removeEventListener(name, func);
        };
    }
}
//koniec gierki alert
