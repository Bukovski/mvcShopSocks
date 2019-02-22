const ProductPicturesView = (() => {
  const _picGrid = $(".picture__grid");
  const _picPreview = $(".picture__preview");
  
  return class {
    constructor(model) {
      this._model = model;
    }
    
    layoutMainImg(imgSrc, imgAlt) {
      return `<img class="picture__product" src="${ PATH.IMAGE + imgSrc }" alt="${ imgAlt }">`;
    }
    
    
    init() {
    
    }
  }
})();

class ProductView {
  constructor(model) {
    this._model = model;
    this.picturesView = new ProductPicturesView(model);
  }
  
  show() {
    this.picturesView.init();
  }
}