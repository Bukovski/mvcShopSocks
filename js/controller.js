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
  }
}
