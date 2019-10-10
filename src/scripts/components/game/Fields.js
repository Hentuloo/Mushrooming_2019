class Fields {
  constructor(fields) {
    let _fields = fields;
    let _deletedItems = [];

    this.getFieldTypes = () => _fields.types;
    this.getAllProp = () => _fields;
    this.getFieldDirections = () =>
      _fields.properties.map(el => ({
        index: el.index,
        xPrecent: el.xPrecent,
        yPrecent: el.yPrecent,
      }));
    this.checkField = index => _fields.properties[index];
    this.clearItemsFromField = fieldIndex => {
      const { index, value } = _fields.properties[fieldIndex];
      if (value) {
        _deletedItems.push({ index, value });
        _fields.properties[fieldIndex].value = 0;
      }
    };
    this.resetFields = () => {
      _deletedItems.forEach(item => {
        _fields.properties[item.index].value = item.value;
      });
      _deletedItems = [];
    };
  }
}
export default Fields;
