class Dice {
    constructor(diceElement, buttonElement, numberElement) {
        this.diceElement = diceElement;
        this.numberElement = numberElement;
        this.buttonElement = buttonElement;
        let _number = null;
        let _diceStatus = false;

        let _numberFlag = true;

        this.diceSwitchStatus = flag => {
            _diceStatus = flag;
            this.setAnimation();
        };

        this.setAnimation = () =>
            this.diceElement.setAttribute(
                'class',
                `dice game__dice ${_diceStatus ? 'dice--throw-animation' : ''}`,
            );
        this.throw = () => {
            if (_diceStatus) {
                this.diceSwitchStatus(false);
                _number = Math.floor(Math.random() * 6) + 1;
                if (_numberFlag) {
                    this.numberElement.innerText = _number;
                }
                document.dispatchEvent(new Event('throwDice'));
            }
        };
        this.getNumber = () => _number;

        //disable button for keyboard
        this.buttonElement.addEventListener('keydown', e => {
            e.preventDefault();
        });

        this.buttonElement.addEventListener('click', e => {
            document.dispatchEvent(new Event('throwDice'));
        });
        this.changeNumberFlag = flag => (_numberFlag = flag);
    }
}
