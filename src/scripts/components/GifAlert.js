class GifAlert {
    constructor({
        settings,
        container,
        image,
        number,
        gifContainerClass,
        numberHideClass,
        containerHideClass,
    }) {
        let _enableGifs = true;

        const _gifs = settings;
        const _gifContainer = container;
        const _gifImage = image;
        const _gifNumber = number;
        let _active = true;
        let _gifsQueue = [];

        this.src;
        this.alt;
        this.containerModifier;
        this.number;

        this.defaultGifTime = 2900;

        this.newRandomGift = ({ gifGroup, modifier, number }) => {
            if (!_enableGifs) return;
            if ((gifGroup && _active) || _gifsQueue.length) {
                //delete last gif
                if (_gifsQueue.length) {
                    clearTimeout(_gifsQueue[_gifsQueue.length - 1]);
                    _gifsQueue.pop();
                }
                _active = false;
                //select random gif
                const gifsOneTypeArray = _gifs[gifGroup];
                const randomGif =
                    gifsOneTypeArray[
                        Math.floor(Math.random() * gifsOneTypeArray.length)
                    ];
                const { src, alt, time } = randomGif;

                const timeout = setTimeout(() => {
                    _active = true;
                    this.containerModifier = 'normal';
                    this.number = null;
                    this.updateGif();
                }, time || this.defaultGifTime);

                _gifsQueue.push(timeout);

                this.src = src;
                this.alt = alt;

                if (modifier) {
                    this.containerModifier = modifier;
                }
                if (number) {
                    this.number = number;
                }

                this.updateGif();
            }
        };

        this.updateGif = () => {
            if (!_enableGifs) return;
            if (this.src) {
                _gifImage.src = this.src;
            }
            if (this.alt) {
                _gifImage.alt = this.alt;
            }
            if (this.number) {
                _gifNumber.innerText = this.number;
                _gifNumber.classList.add(numberHideClass);
                setTimeout(() => {
                    _gifNumber.classList.remove(numberHideClass);
                }, 200);
            } else {
                _gifNumber.innerText = '';
            }
            //add special type

            if (
                this.containerModifier === 'normal' ||
                this.containerModifier === undefined
            ) {
                _gifContainer.setAttribute(
                    'class',
                    `${gifContainerClass}
                    ${!_active ? containerHideClass : ''}`,
                );
            } else {
                _gifContainer.classList.add(
                    `${gifContainerClass}--${this.containerModifier}`,
                );
            }

            //remove --hide when is active
            _active
                ? _gifContainer.classList.add(containerHideClass)
                : _gifContainer.classList.remove(containerHideClass);
        };
        this.changeEnable = flag => (_enableGifs = flag);
    }
}
