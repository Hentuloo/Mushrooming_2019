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
        const imgElement = imgs[_indexForImages];
        _indexForImages++;

        var image = new Image();
        image.onload = ss => {
          if (imgElement.dataset.src.includes(this.closeTrigger)) {
            this.closeLoadingPage();
          }

          //set srcset and delete data-srcset
          if (imgElement.dataset.srcset) {
            imgElement.srcset = imgElement.dataset.srcset;
            delete imgElement.dataset.srcset;
          }

          //set sizes and delete data-sizes
          if (imgElement.dataset.sizes) {
            imgElement.sizes = imgElement.dataset.sizes;
            delete imgElement.dataset.sizes;
          }

          if (imgElement.dataset.src) {
            imgElement.src = imgElement.dataset.src;
            delete imgElement.dataset.src;
          }
          this.loadSync();
        };

        if (imgElement.dataset.srcset) {
          image.srcset = imgElement.dataset.srcset;
        }
        if (imgElement.dataset.sizes) {
          image.sizes = imgElement.dataset.sizes;
        }
        if (imgElement.dataset.src) {
          image.src = imgElement.dataset.src;
        }
      } else {
        this.loadViedos();
      }
    };
    this.loadViedos = () => {
      if (videos.length > _indexForViedos) {
        const video = document.createElement('video');
        const videoElement = videos[_indexForViedos];
        video.src = videoElement.src;
        video.autoplay = true;
        video.load();
        video.onloadeddata = () => {
          _indexForViedos += 1;
          video.pause();
          return this.loadViedos();
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
