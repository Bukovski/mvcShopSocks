const ProductPicturesView = (() => {
  const _picGrid = $(".picture__grid");
  const _picPreview = $(".picture__preview");
  
  return class {
    constructor(model) {
      this._model = model;
      this.clickPreviewPicture = new Event();
    }
    
    layoutMainImg(imgSrc, imgAlt) {
      return `<img class="picture__product" src="${ PATH.IMAGE + imgSrc }" alt="${ imgAlt }">`;
    }
    layoutPreviewImg(imgSrc, imgAlt, index) {
      return `<div class="picture__wrapper" img-index="${ index }">
  <img class="picture__nav" src="${ PATH.IMAGE + imgSrc }" alt="${ imgAlt }">
</div>`;
    }
  
    showMainPicture(index) {
      this._model.dataMainPicture
        .then(obj => _picGrid.html(this.layoutMainImg(obj.image[index], obj.title)) );
    }
  
    bufferPreviewPicture() {
      return this._model.dataMainPicture
        .then(obj => obj.image.reduce((prevElem, curElem, index)=> {
          return prevElem += this.layoutPreviewImg(curElem, obj.title, index);
        }, ""))
    }
    showPreviewPicture(index) {
      this.bufferPreviewPicture()
        .then((html) => _picPreview.html(html))
        .then(() => $(".picture__wrapper").eq(index)
          .addClass("picture__wrapper--active"))
    }
  
    rebuildPictures() {
      const currentPicture = this._model.previewIndexPicture;
    
      this.showMainPicture(currentPicture);
      this.showPreviewPicture(currentPicture);
    }
    
    
    init() {
      this.rebuildPictures();
  
      this._model.changePicture.attach(() => {
        this.rebuildPictures();
      });
  
      const _self = this;
  
      _picPreview.on("click", ".picture__wrapper", function() {
        const currentElem = $(this);
        const isActive = currentElem.hasClass("picture__wrapper--active");
        const indexElem = currentElem.attr("img-index");
    
        if (!isActive) {
          _self.clickPreviewPicture.notify(indexElem);
        }
      });
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