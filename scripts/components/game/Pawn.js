class Pawn {
    constructor(player, pawnStatWrapper, fieldsWrappers, gameSpeed) {
        //pawn values
        const _id = player.id;
        const _type = player.type;
        const _fieldsWrappers = fieldsWrappers;
        const _pawnName = player.nick || `gracz: ${player.id}`;
        const _pawnColor = player.color;

        let _mushrooms = [];
        let _points = 0;
        let _extraPoints = 0;

        //pawn statistic panel
        const _pawnStatWrapper = pawnStatWrapper;
        let _pawnStatSelf;
        let _pawnActive = false;

        //pawn on the map
        let _pawnElement;
        let _activeFieldNumber = player.field || 0;
        let _activeFieldElement;

        const _keyCode = player.keyCode || false; //space-key
        document.addEventListener('keydown', e => {
            if (_keyCode === false) return;

            if (e.keyCode == _keyCode) {
                document.dispatchEvent(new Event(`throwDiceUser-${_id}`));
            }
        });

        this.movementSpeed = chooseMovementSpeed();

        this.updateStatPanel = () => {
            //create stat panel (in initial step)
            if (!_pawnStatSelf) this.firstTimeDrawStatPanel();

            //check the active flag
            if (_pawnActive) {
                _activeFieldElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                });
                _pawnStatSelf.classList.add('pawn-stat--active');
                _pawnElement.classList.add('game__item-pawn--active');
            } else {
                _pawnStatSelf.classList.remove('pawn-stat--active');
                _pawnElement.classList.remove('game__item-pawn--active');
            }
            //update score
            _points = 0;
            _mushrooms.forEach(mushroom => (_points += mushroom.value));
            _pawnStatSelf.querySelector('.pawn-stat__score').innerText =
                _points + _extraPoints;

            //update items
            const pawnStatItems = _pawnStatSelf.querySelector(
                '.pawn-stat__items',
            );
            if (_mushrooms.length !== pawnStatItems.childNodes.length) {
                //remove all mushrooms (images) from .pawn-stat__items
                while (pawnStatItems.hasChildNodes()) {
                    pawnStatItems.removeChild(pawnStatItems.lastChild);
                }

                _mushrooms.forEach(mushroom => {
                    const mushroomImg = document.createElement('img');
                    mushroomImg.setAttribute('src', mushroom.src);
                    mushroomImg.setAttribute('class', 'pawn-stat__items-img');
                    pawnStatItems.appendChild(mushroomImg);
                });
            }
        };

        this.drawPawn = () => {
            _pawnElement = document.createElement('div');
            _pawnElement.setAttribute(
                'class',
                `game__item-pawn game__item-pawn--${_pawnColor}`,
            );
            _fieldsWrappers[_activeFieldNumber].appendChild(_pawnElement);
            _activeFieldElement = _fieldsWrappers[_activeFieldNumber];

            _activeFieldElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        };
        this.moveSync = async number => {
            let intervalTimesRun = 0;
            let interval;
            let changeDirection = false;
            await new Promise(resolve => {
                interval = setInterval(() => {
                    //check number of literals
                    if (intervalTimesRun >= Math.abs(number) - 1) {
                        //delete all plant from activeField

                        this.removePlantsFromCurrentField(
                            changeDirection ? -number : number,
                        );
                        clearInterval(interval);
                        resolve(true);
                    }
                    //clear pawn in previous field
                    _activeFieldElement.removeChild(_pawnElement);

                    //change flag if pawn is on the end of map
                    if (
                        _activeFieldNumber === _fieldsWrappers.length - 2 &&
                        changeDirection === false
                    ) {
                        _activeFieldNumber += 2;
                        changeDirection = true;
                    }

                    if (changeDirection) {
                        --_activeFieldNumber;
                    } else {
                        number > 0
                            ? ++_activeFieldNumber
                            : --_activeFieldNumber;
                    }

                    //draw pawn in new field
                    this.drawPawn();
                    //increment literals number
                    intervalTimesRun++;
                }, this.movementSpeed);
            });
        };
        this.newItem = (type, value, fieldTypes) => {
            const typeValues = fieldTypes.find(field => field.type === type);
            for (let i = 0; i < value; i++) {
                const item = { src: typeValues.src, value: typeValues.value };
                _points += typeValues.value;
                _mushrooms.push(item);
            }
            // fieldTypes;
        };
        this.removePlantsFromCurrentField = number => {
            //if it's the last field on the map dont
            const currentField =
                _fieldsWrappers[_activeFieldNumber + (number > 0 ? 1 : -1)];
            if (currentField.childNodes) {
                const currentFieldChilds = [...currentField.childNodes];
                currentFieldChilds.forEach(child => {
                    if (child.dataset.itemType === 'plant') child.remove();
                });
            }
        };
        this.firstTimeDrawStatPanel = () => {
            const pawnStatElement = document.createElement('div');
            pawnStatElement.setAttribute('class', 'pawn-stat game__pawn-stat');

            //score
            const pawnScore = document.createElement('div');
            pawnScore.setAttribute('class', 'pawn-stat__score');
            pawnStatElement.appendChild(pawnScore);

            //name
            const pawnName = document.createElement('div');
            pawnName.setAttribute('class', 'pawn-stat__name');
            pawnName.textContent = _pawnName;
            pawnStatElement.appendChild(pawnName);

            //circle
            const pawnCircle = document.createElement('div');
            pawnCircle.setAttribute(
                'class',
                `pawn-stat__circle pawn-stat__circle--${_pawnColor}`,
            );
            pawnStatElement.appendChild(pawnCircle);

            //item container
            const pawnItems = document.createElement('div');
            pawnItems.setAttribute('class', 'pawn-stat__items');
            pawnStatElement.appendChild(pawnItems);

            _pawnStatSelf = pawnStatElement;
            _pawnStatWrapper.appendChild(pawnStatElement);
        };
        this.reset = () => {
            _activeFieldElement.removeChild(_pawnElement);
            _mushrooms = [];
            _points = 0;
            _extraPoints = 0;
            _activeFieldNumber = 0;
            this.drawPawn();
        };

        function chooseMovementSpeed() {
            if (_type === 'computer') {
                switch (gameSpeed) {
                    case 'slow':
                        return 300;
                    case 'normal':
                        return 150;
                    case 'fast':
                        return 50;
                    default:
                        return 200;
                }
            } else {
                switch (gameSpeed) {
                    case 'slow':
                        return 500;
                    case 'normal':
                        return 300;
                    case 'fast':
                        return 100;
                    default:
                        return 200;
                }
            }
        }

        this.lostRandomMashrooms = number => {
            for (let i = 0; i <= number - 1; i++) {
                const randomNumber = Math.floor(
                    Math.random() * _mushrooms.length,
                );
                _mushrooms.splice(randomNumber, 1);
            }
            this.updateStatPanel();
        };
        this.extraMashrooms = (values, fieldsTypes) => {
            for (let i = 0; i <= values.number - 1; i++) {
                const mushroomType = fieldsTypes.find(
                    field => field.type === values.type,
                );
                _mushrooms.push({
                    src: mushroomType.src,
                    value: mushroomType.value,
                });
            }
            this.updateStatPanel();
        };
        this.extraPoints = (points = 0) => {
            _extraPoints += points;
            this.updateStatPanel();
        };
        this.getType = () => _type;
        this.getName = () => _pawnName;
        this.getPointsNumber = () => _points + _extraPoints;
        this.activeStatus = flag => {
            _pawnActive = flag;
            if (flag) this.updateStatPanel();
        };
        this.getId = () => _id;
        this.activeFieldNumber = () => _activeFieldNumber;
    }
}
