class Swipper {
    constructor({ sections, buttons }) {
        this.sections = sections;

        this.swipperActive = true;

        this.activeSection = 0;
        this.activeSwipper = true;

        this.swipteInitY = null;
        this.swipteInitX = null;

        this.buttons = buttons;
        this.buttons.forEach(button =>
            button.addEventListener('click', () => this.swipe(1)),
        );

        document.addEventListener('wheel', this.wheelSwipe);

        document.addEventListener('touchstart', this.touchSwipeStart);
        document.addEventListener('touchmove', this.touchSwipeMove);

        document.addEventListener('keydown', this.keyboardSwipe);
    }

    changeScrollFlag = flag => (this.swipperActive = flag);

    findActiveSection = () => {};

    swipe = direction => {
        if (!this.swipperActive) return;

        if (this.activeSwipper) {
            this.activeSwipper = false;
            setTimeout(() => {
                this.activeSwipper = true;
            }, 400);

            //swipe UP
            if (direction > 0) {
                if (this.activeSection < this.sections.length - 1) {
                    this.activeSection++;
                    this.sections[this.activeSection].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            } else {
                //swipe Down
                if (this.activeSection > 0) {
                    this.activeSection--;
                    this.sections[this.activeSection].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }
        }
    };
    touchSwipeStart = e => {
        this.swipteInitY = e.touches[0].clientY;
    };
    touchSwipeMove = e => {
        //when is itroduction section(with map)
        if (this.activeSection === 0) return;
        if (this.swipperActive) {
            const currentY = e.touches[0].clientY;

            const deltaY = this.swipteInitY - currentY;
            if (deltaY < 0) {
                //scroll down
                this.swipe(-1);
            } else {
                //scroll up
                this.swipe(1);
            }
        }
    };

    keyboardSwipe = e => {
        if (this.swipperActive) {
            switch (e.keyCode) {
                case 40:
                    this.swipe(1);
                    break;
                case 38:
                    this.swipe(-1);
                    break;
                default:
                    return;
            }
        }
    };

    wheelSwipe = ({ deltaY }) => {
        if (!this.swipperActive) return;
        if (deltaY > 0) {
            this.swipe(1);
        } else {
            this.swipe(-1);
        }
    };
}
