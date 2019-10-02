class CursorPrecent {
    constructor() {
        this.fields = [];
        this.image = document.querySelector('.game__map');
        window.addEventListener('click', this.click);
    }
    click = e => {
        const cursorX = e.offsetX;
        const cursorY = e.offsetY;
        const imgWidth = this.image.clientWidth;
        const imgHeight = this.image.clientHeight;

        const precentX = (cursorX / imgWidth) * 100;
        const precentY = (cursorY / imgHeight) * 100;

        const precentRoundX = Math.round(precentX * 100) / 100;
        const precentRoundY = Math.round(precentY * 100) / 100;

        const item = {
            index: this.fields.length,
            xPrecent: precentRoundX,
            yPrecent: precentRoundY,
            type: 'natural',
        };
        this.fields.push(item);
        console.log(JSON.stringify([...this.fields]));
    };
}
new CursorPrecent();
