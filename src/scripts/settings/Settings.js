const Settings = {
    //setting page classes
    generalConfig: {
        startButton: '.settings__button--start',
        gameSettings: {
            gameContainer: document.querySelector('.game'),
            gameMapContainer: document.querySelector(
                '.game__map-items-wrapper',
            ),
            mapOnlyClass: 'game--map-only',
            startedClass: 'game--started',
        },
        arrowSettings: {
            arrowButton: document.querySelector('.button--arrow'),
            hideClass: 'button--hidden',
        },
        interfaceBar: document.querySelector('.game__interface-top-bar'),
    },
    LoadingPageConfig: {
        container: document.querySelector('.loadingPage'),
        hiddenClass: 'loadingPage--hidden',
        trigger: 'singleArrow.png',
    },
    PanelConfig: {
        players: [...document.querySelectorAll('.settings__player')],
        game: document.querySelector('.settings__game'),
        keyButtons: [...document.querySelectorAll('.settings__player-keyCode')],
        checkboxClass: '.settings__player-checkbox',
        colorClass: '.settings__player-color',
        nickClass: '.settings__player-name',
        typeClass: '.settings__player-types',
        keyCodeClass: '.settings__player-keyCode',
        speedClass: '#settings__spead-select',
        gameTypeClass: '#settings__mood-select',
        specialEffectsClass: '#settings__effects-select',
        keyButtonDefault: 'Wybierz klawisz',
    },
    swiperConfig: {
        sections: [...document.querySelectorAll('.swipper-element')],
        buttons: document.querySelectorAll('.button-next-section'),
    },

    initialGameSettings: {
        diceThrowedDelay: 800,
        newRoundDelay: 500,
        gameType: 'normal',
    },
    videoConfig: {
        container: document.querySelector('.game__video-container'),
        video: document.querySelector('.game__video-image'),
        number: document.querySelector('.game__video-number'),
        videoContainerClass: 'game__video-container',
        numberHideClass: 'game__video-number--hide',
        containerHideClass: 'game__video-container--hide',
    },
    batleMapConfig: {
        wrapper: document.querySelector('.game__map-items-wrapper'), //game map container
        map: document.querySelector('.game__map'),
        itemWrapperClass: 'game__item-wrapper',
        itemClass: 'game__item-image',
    },

    diceConfig: {
        container: document.querySelector('.game__dice'), //dice container
        button: document.querySelector('.game__dice .dice__button'), //dice button
        number: document.querySelector('.game__dice .dice__number'), // dice span number
        animationClass: 'dice--throw-animation',
        classContainer: 'dice game__dice',
    },
    alertConfig: {
        wrapper: document.querySelector('.game__alert'),
        buttonCloseClass: '.alert__button-close',
        titleClass: '.alert__title',
        description: '.alert__description',
        hideClass: 'alert--hide',
    },
    pawnConfig: {
        statActiveClass: 'pawn-stat--active',
        pawnActiveClass: 'game__item-pawn--active',
        statScore: '.pawn-stat__score',
        statItems: '.pawn-stat__items',
        statImgItems: 'pawn-stat__items-img',
        statDiv: {
            containerClass: 'pawn-stat game__pawn-stat',
            scoreClass: 'pawn-stat__score',
            nameClass: 'pawn-stat__name',
            circle: 'pawn-stat__circle',
        },
    },
    mapSwipeMoveConfig: {
        container: document.querySelector('.game__map-items-wrapper'),
        transitionClass: 'game__map-items-wrapper--transition',
    },
    lazyLoadConfig: {
        firstInQueue: [
            './assets/images/singleArrow.png',
            './assets/images/arrowNavigation.png',
            './assets/images/map.png',
        ],
    },
};
export default Settings;
