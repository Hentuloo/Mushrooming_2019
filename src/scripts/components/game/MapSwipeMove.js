class MapSwipeMove {
    constructor({ container, transitionClass }) {
        const _container = container;
        let _active = false;

        let initialClientX = null;
        let initialClientY = null;

        let _initialContainerPosition = null;

        const borderScreenLimit = 300;

        this.mapClickDown = e => {
            e.preventDefault();
            _active = true;

            //get current transform values from _container
            const style = window.getComputedStyle(_container);
            const matrix = new WebKitCSSMatrix(style.webkitTransform);
            const mapTranslateX = matrix.m41;
            const mapTranslateY = matrix.m42;

            _initialContainerPosition = {
                left: mapTranslateX,
                top: mapTranslateY,
            };

            initialClientX =
                (e.clientX || e.touches[0].clientX) - mapTranslateX;
            initialClientY =
                (e.clientY || e.touches[0].clientY) - mapTranslateY;
        };
        this.mapClickMove = e => {
            e.preventDefault();
            if (!_active) return;

            const currentClientX = e.clientX || e.touches[0].clientX;
            const currentClientY = e.clientY || e.touches[0].clientY;

            _container.style.transform = `
            translate(
                ${currentClientX - initialClientX}px, 
                ${currentClientY - initialClientY}px)`;
        };
        this.mapClickUp = () => {
            _active = false;

            //reset when map is out of the box
            const boxPosition = _container.getBoundingClientRect();

            //1 - from top
            //2 - from left
            //1 - from  bottom
            //1 - from right
            if (
                boxPosition.top - borderScreenLimit > 0 ||
                boxPosition.left - borderScreenLimit > 0 ||
                boxPosition.bottom - window.innerHeight + borderScreenLimit <
                    0 ||
                boxPosition.right + borderScreenLimit < window.innerWidth
            ) {
                _container.classList.add(transitionClass);

                _container.style.transform = `translate(${_initialContainerPosition.left}px,${_initialContainerPosition.top}px)`;
                setTimeout(() => {
                    _container.classList.remove(transitionClass);
                }, 200);

                return;
            }
        };

        _container.addEventListener('mousedown', this.mapClickDown);
        _container.addEventListener('mouseup', this.mapClickUp);
        _container.addEventListener('mousemove', this.mapClickMove);

        _container.addEventListener('touchstart', this.mapClickDown);
        _container.addEventListener('touchend', this.mapClickUp);
        _container.addEventListener('touchmove', this.mapClickMove);
    }
}
