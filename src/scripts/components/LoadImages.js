import gifsSettings from '../settings/gifsSettings.js';

class LoadImages {
    constructor() {
        let _indexForImages = 0;
        let _indexForGifs = 0;

        const imgs = [...document.querySelectorAll('[data-src]')];
        const gifs = Object.values(gifsSettings).reduce(
            (prev, current) => [...prev, ...current],
            [],
        );

        this.loadSync = () => {
            if (imgs.length > _indexForImages) {
                const img = new Image();
                const imgElement = imgs[_indexForImages];
                img.src = imgElement.dataset.src;
                img.onload = () => {
                    _indexForImages++;

                    imgElement.nodeName === 'IMG' &&
                        (imgElement.src = imgElement.dataset.src);

                    return this.loadSync();
                };
            } else {
                this.loadGifs();
            }
        };
        this.loadGifs = () => {
            if (gifs.length > _indexForGifs) {
                const img = new Image();
                const imgElement = gifs[_indexForGifs];
                img.src = imgElement.src;
                img.onload = () => {
                    _indexForGifs++;
                    return this.loadSync();
                };
            }
        };
        this.imagesPushFirst = newImages => {
            newImages.forEach(image => {
                //find the same imgae
                const index = imgs.findIndex(
                    singleImage => singleImage.dataset.src === image,
                );
                //delete
                if (index > -1) {
                    const item = imgs.splice(index, 1);
                    imgs.unshift(item[0]);
                } else {
                    imgs.unshift({ dataset: { src: image } });
                }
                //add as first
            });
        };
    }
}
export default LoadImages;
