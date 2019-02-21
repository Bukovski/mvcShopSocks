window.onload = function () {
  const modelProduct = new ProductModel();
  const controllerProduct = new ProductController();
  const viewProduct = new ProductView(modelProduct, controllerProduct);
  
  controllerProduct.initialize(modelProduct, viewProduct);
};
