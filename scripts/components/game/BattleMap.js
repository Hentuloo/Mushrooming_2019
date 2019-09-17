class BattleMap {
    constructor(gameMapContainer, mapImage, fields) {
        this.gameContainer = gameMapContainer;
        this.image = mapImage;
        let _fields = fields;

        //create wrappers for any field
        this.fieldsWrappers = this.createFieldsElementsInDOM(
            _fields.properties,
        );

        this.refreshMap = () => {
            _fields.properties.forEach(field => {
                _fields.types.forEach(({ type, src, alt }) => {
                    const checkingField = this.fieldsWrappers[field.index];
                    if (type !== 'natural') {
                        // if checking field have item(plant)
                        const fieldChilds = [...checkingField.childNodes];
                        const withPlants = fieldChilds.find(
                            item => item.dataset.itemType === 'plant',
                        );

                        if (withPlants) return;

                        //find field-type and check: if have src
                        if (field.type === type && src) {
                            const items = this.createItemsForField(
                                field,
                                src,
                                alt,
                            );
                            if (!items) return; //if item value === 0 (dont have images)
                            items.forEach(item =>
                                checkingField.appendChild(item),
                            );
                        }
                    }
                });
            });
        };
    }
    createFieldsElementsInDOM = fields => {
        const mapImage = new Image();
        mapImage.src = this.image.dataset.src;
        mapImage.onload = () => {
            this.image.src = this.image.dataset.src;
            /// do some work;
            this.fieldsWrappers = fields.map(field => {
                const fieldDiv = document.createElement('div');
                fieldDiv.setAttribute('class', 'game__item-wrapper');
                fieldDiv.setAttribute('data-fieldId', field.index);
                // fieldDiv.textContent = field.index;

                //set wrapper position
                const x =
                    (field.xPrecent * this.image.clientWidth) / 100 +
                    this.image.offsetLeft -
                    40;
                const y =
                    (field.yPrecent * this.image.clientHeight) / 100 +
                    this.image.offsetTop -
                    40;
                fieldDiv.style.transform = `translate(${x}px , ${y}px)`;

                //add field to game container
                this.gameContainer.appendChild(fieldDiv);
                //return element for future change
                return fieldDiv;
            });
            this.refreshMap();
        };
    };
    createItemsForField = (field, imageSrc, alt) => {
        //crate img element
        let itemImg = [];
        for (let i = 0; i <= field.value - 1; i++) {
            itemImg.push(document.createElement('img'));

            itemImg[i].setAttribute('src', imageSrc);
            itemImg[i].setAttribute('class', 'game__item-image');
            itemImg[i].dataset.itemType = 'plant';
            if (alt) {
                itemImg[i].setAttribute('alt', alt);
            }
        }
        return itemImg;
    };
}
