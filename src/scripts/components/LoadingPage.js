class LoadingPage {
    constructor({ container, hiddenClass }) {
        this.container = container;
        this.hiddenClass = hiddenClass;
    }
    close = () => {
        console.log(this.container);
        this.container.classList.add(this.hiddenClass);
    };
    open = () => {
        this.container.classList.remove(this.hiddenClass);
    };
}
export default LoadingPage;
