class ProductModel {
  constructor() {
    this.dataJson = [];
    this.productIndex = 0;
  }
  
  getData() {
    this.dataJson = $.get(PATH.DB);
  }
  
  _getDataIndex(index) {
    const getIndex = index || this.productIndex;
    
    return this.dataJson.then(arr => arr[ getIndex ]);
  }
}
