class VideoAlert {
    constructor({
        settings,
        container,
        video,
        number,
        videoContainerClass,
        numberHideClass,
        containerHideClass,
    }) {
        let _enableVideos = true;

        const _video = settings;
        const _videoContainer = container;
        const _videoTag = video;
        const _videoNumber = number;
        let _active = true;
        let _videoQueue = [];

        this.src;
        this.alt;
        this.containerModifier;
        this.number;

        this.defaultVideoTime = 2900;

        this.newRandomVideo = ({ videoGroup, modifier, number }) => {
            if (!_enableVideos) return;
            if ((videoGroup && _active) || _videoQueue.length) {
                //delete last video
                if (_videoQueue.length) {
                    clearTimeout(_videoQueue[_videoQueue.length - 1]);
                    _videoQueue.pop();
                }
                _active = false;
                //select random video
                const videosOneTypeArray = _video[videoGroup];
                const randomVideo =
                    videosOneTypeArray[
                        Math.floor(Math.random() * videosOneTypeArray.length)
                    ];
                const { src, alt, time } = randomVideo;

                const timeout = setTimeout(() => {
                    _active = true;
                    this.containerModifier = 'normal';
                    this.number = null;
                    this.updateViedo();
                }, time || this.defaultVideoTime);

                _videoQueue.push(timeout);

                this.src = src;
                this.alt = alt;

                if (modifier) {
                    this.containerModifier = modifier;
                }
                if (number) {
                    this.number = number;
                }

                this.updateViedo();
            }
        };

        this.updateViedo = () => {
            if (!_enableVideos) return;
            if (this.src) {
                _videoTag.src = this.src;
                // debugger;
            }
            if (this.alt) {
                _videoTag.alt = this.alt;
            }
            if (this.number) {
                _videoNumber.innerText = this.number;
                _videoNumber.classList.add(numberHideClass);
                setTimeout(() => {
                    _videoNumber.classList.remove(numberHideClass);
                }, 200);
            } else {
                _videoNumber.innerText = '';
            }
            //add special type
            if (
                this.containerModifier === 'normal' ||
                this.containerModifier === undefined
            ) {
                if (!_active) {
                    _videoTag.play();
                    _videoContainer.setAttribute(
                        'class',
                        `${videoContainerClass} ${containerHideClass}`,
                    );
                } else {
                    _videoTag.pause();
                    _videoContainer.setAttribute(
                        'class',
                        `${videoContainerClass}`,
                    );
                }
            } else {
                _videoContainer.classList.add(
                    `${videoContainerClass}--${this.containerModifier}`,
                );
            }

            //remove --hide when is active
            _active
                ? _videoContainer.classList.add(containerHideClass)
                : _videoContainer.classList.remove(containerHideClass);
        };
        this.changeEnable = flag => (_enableVideos = flag);
    }
}

export default VideoAlert;
