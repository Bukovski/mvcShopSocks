class ProductController {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  
  initialize() {
    this._model.getData(); //get data from file .json
    this._view.show(); //to start the rendering of the page
    
    this.listeners(); //all event listeners page
  }
  
  listeners() {
    this._view.picturesView.clickPreviewPicture.attach((index) => {
      this._model.previewIndexPicture = index;
    });
  
    this._view.sizeView.clickSize.attach((index) => {
      this._model.indexSizeProduct = index;
    });
  
    this._view.buttonView.clickOnBayButton.attach(() => {
      this._model.bayProduct;
    });
  
    this._view.colorNavigationView.clickNavigateColor.attach((index) => {
      this._model.indexProduct = index;
    });
    
    this._view.modalView.toogleModalWindowEvent.attach((bool) => {
      this._model.isOpenedModalWindow = bool;
    });
  
    this._view.colorNavigationView.resetDataPage.attach(() => {
      this._model.previewIndexPicture = 0;
      this._model.indexSizeProduct = null;
    });
  
    this._view.cartView.clickRemoveProduct.attach((index) => {
      this._model.cartRemoveData = index;
    });
  }
}
