class Alert {
    constructor({
        wrapper,
        buttonCloseClass,
        titleClass,
        description,
        hideClass,
    }) {
        const _alertWrapper = wrapper;
        let _active = false;

        this.alertTitle;
        this.alertContent;
        this.alertButton;

        this.buttonClicked = () => {
            //dispatch function for run Special function
            document.dispatchEvent(new Event('specialFieldAlertAccept'));
            _active = false;
            this.updateAlert();
        };
        this.newAlert = field => {
            //add Event listener on Accept alert
            const button = _alertWrapper.querySelector(buttonCloseClass);
            button.addEventListener('click', this.buttonClicked);

            _active = true;
            this.alertTitle = field.alertTitle;
            this.alertContent = field.alertContent;
            this.alertButton = field.alertButton;
            this.updateAlert();
        };
        this.updateAlert = () => {
            if (this.alertTitle) {
                _alertWrapper.querySelector(
                    titleClass,
                ).innerText = this.alertTitle;
            }
            if (this.alertContent) {
                _alertWrapper.querySelector(
                    description,
                ).innerText = this.alertContent;
            }
            if (this.alertButton) {
                _alertWrapper.querySelector(
                    buttonCloseClass,
                ).innerText = this.alertButton;
            }
            _active
                ? _alertWrapper.classList.remove(hideClass)
                : _alertWrapper.classList.add(hideClass);
        };
        this.gameEndAlert = ({ results, firstWon }) => {
            if (results) {
                _active = true;
                const winner = firstWon || results[0].name;
                this.alertTitle = `Wygrał ${winner}`;
                this.alertButton = 'Rewanż!';
                //players places
                this.alertContent = results
                    .map((result, i) => {
                        if (firstWon) {
                            return `${result.name} : ${result.points}-punktów`;
                        }
                        return `${i + 1} - miejsce zdobył: ${result.name}`;
                    })
                    .join(', ');

                this.updateAlert();

                const button = _alertWrapper.querySelector(buttonCloseClass);
                button.addEventListener('click', this.buttonClicked);
            }
        };
    }
}
