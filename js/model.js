class ProductModel {
  constructor() {
    this.dataJson = [];
    this.productIndex = 0;
    this.prewiewPicture = 0;
    this.sizeIndex = null;
    this.outOfStock = true;
    this.modalWindowOpened = false;
    this.cart = [];
    this.changeProductColor = new Event();
    this.changePicture = new Event();
    this.changeSize = new Event();
    this.orderBayButton = new Event();
    this.addToCart = new Event();
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
  
  get navigateColor() {
    return this.dataJson
      .then(arr => arr.map(obj => ({ color: obj.color, title: obj.currentColor })))
  }
  get indexProduct() {
    return this.productIndex;
  }
  set indexProduct(index) {
    this.productIndex = index;
    
    this.changeProductColor.notify();
  }
  
  get dataSizeProduct() {
    return this._getDataIndex().then(obj => obj.sizes)
  }
  get indexSizeProduct() {
    return this.sizeIndex;
  }
  set indexSizeProduct(index) {
    this.sizeIndex = index;
    
    this.changeSize.notify();
  }
  
  get dataDescriptionProduct() {
    return this._getDataIndex().then(obj => ({ price: obj.price, title: obj.title }));
  }
  
  get productOutOfStock() {
    return this.dataSizeProduct
      .then(arr => this.outOfStock = !arr.filter(elem => elem.stock !== false).length)
      .then(() => this.outOfStock);
  }
  
  get bayProduct() {
    if (this.indexSizeProduct) { //check size 1 2, if not null
      this._getDataIndex().then(data => this.addToCartProduct(data));
    } else {
      this.orderBayButton.notify(); //open the modal window for choose size
    }
  }
  
  get isOpenedModalWindow() {
    return this.modalWindowOpened;
  }
  set isOpenedModalWindow(bool) {
    this.modalWindowOpened = bool;
  }
  
  addToCartProduct(data) {
    let indexProductOnCart = -1;
    const sizePrice = (obj) => obj.sizes[ this.indexSizeProduct ].size;
    
    this.cart.forEach((obj, index) => {
      if (obj.id === data.id && obj.size === sizePrice(data)) {
        indexProductOnCart = index
      }
    });
    
    if (indexProductOnCart === -1) {
      const productTemplate = {
        id: data.id,
        title: data.title,
        image: data.image[ 0 ],
        color: data.currentColor,
        size: sizePrice(data),
        price: data.price,
        pieces: 1
      };
      
      this.cart.push(productTemplate)
    } else {
      this.cart[ indexProductOnCart ].pieces = (this.cart[ indexProductOnCart ].pieces + 1)
    }
    
    this.addToCart.notify();
  }
  get cartData() {
    return this.cart;
  }
  set cartRemoveData(index) {
    this.cart.splice(index, 1);
    
    this.addToCart.notify();
  }
}
