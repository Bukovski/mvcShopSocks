class ProductModel {
  constructor() {
    this.dataJson = [];
    this.productIndex = 0;
    this.prewiewPicture = 0;
    this.changePicture = new Event();
  }
  
  getData() {
    this.dataJson = $.get(PATH.DB);
  }
  
  _getDataIndex(index) {
    const getIndex = index || this.productIndex;
    
    return this.dataJson.then(arr => arr[ getIndex ]);
  }
  
  get dataMainPicture() {
    return this._getDataIndex()
      .then(obj => ({ image: obj.image, title: obj.title }))
  }
  
  get previewIndexPicture() {
    return this.prewiewPicture;
  }
  set previewIndexPicture(index) {
    this.prewiewPicture = index;
  
    this.changePicture.notify();
  }
}
