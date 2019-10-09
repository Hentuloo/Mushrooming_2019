import viedoSettings from '../settings/videoSettings.js';

class LazyLoad {
    constructor({ closeLoadingPage, closeTrigger, firstInQueue }) {
        this.closeTrigger = closeTrigger;
        this.closeLoadingPage = closeLoadingPage;
        this.firstInQueue = firstInQueue;

        let _indexForImages = 0;
        let _indexForViedos = 0;

        const imgs = [...document.querySelectorAll('[data-src]')];
        const videos = Object.values(viedoSettings).reduce(
            (prev, current) => [...prev, ...current],
            [],
        );

        this.loadSync = () => {
            if (imgs.length > _indexForImages) {
                const img = new Image();
                const imgElement = imgs[_indexForImages];
                img.src = imgElement.dataset.src;
                img.onload = () => {
                    if (imgElement.dataset.src.includes(this.closeTrigger)) {
                        this.closeLoadingPage();
                    }

                    _indexForImages++;

                    imgElement.nodeName === 'IMG' &&
                        (imgElement.src = imgElement.dataset.src);

                    return this.loadSync();
                };
            } else {
                this.loadViedos();
            }
        };
        this.loadViedos = () => {
            if (videos.length > _indexForViedos) {
                debugger;
                const video = document.createElement('video');
                const videoElement = videos[_indexForViedos];
                video.src = videoElement.src;
                video.onload = () => {
                    _indexForViedos++;
                    return this.loadSync();
                };
            }
        };
        this.imagesPushFirst = () => {
            this.firstInQueue.forEach(image => {
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
export default LazyLoad;
