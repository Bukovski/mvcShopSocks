const ProductPicturesView = (() => {
  const _picGrid = $(".picture__grid");
  const _picPreview = $(".picture__preview");
  
  return class {
    constructor(model, controller) {
      this._model = model;
      this._controller = controller;
    }
    
    layoutMainImg(imgSrc, imgAlt) {
      return `<img class="picture__product" src="${ PATH.IMAGE + imgSrc }" alt="${ imgAlt }">`;
    }
    
    
    init() {
    
    }
  }
})();

class ProductView {
  constructor(model, controller) {
    this._model = model;
    this._controller = controller;
    this.picturesView = new ProductPicturesView(model, controller);
  }
  
  show() {
    this.picturesView.init();
  }
}