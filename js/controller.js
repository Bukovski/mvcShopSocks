class ProductController {
  constructor() {
    this._model = {};
    this._view = {};
  }
  
  initialize(model, view) {
    this._model = model;
    this._view = view;
    
    this._model.getData(); //get data from file .json
    this._view.show(); //to start the rendering of the page
    
    this.listeners(); //all event listeners page
  }
  
  listeners() {}
}
