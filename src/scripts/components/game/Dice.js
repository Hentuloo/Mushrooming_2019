class Dice {
  constructor({
    container,
    button,
    number,
    animationClass,
    classContainer,
  }) {
    this.diceElement = container;
    this.numberElement = number;
    this.buttonElement = button;
    let _number = null;
    let _diceStatus = false;

    this.animationClass = animationClass;
    this.classContainer = classContainer;

    let _numberFlag = true;

    this.diceSwitchStatus = flag => {
      _diceStatus = flag;
      this.setAnimation();
    };

    this.setAnimation = () =>
      this.diceElement.setAttribute(
        'class',
        `${this.classContainer} ${
          _diceStatus ? this.animationClass : ''
        }`,
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
export default Dice;
