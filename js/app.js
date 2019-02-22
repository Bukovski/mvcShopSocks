window.onload = function () {
  const modelProduct = new ProductModel();
  const viewProduct = new ProductView(modelProduct);
  const controllerProduct = new ProductController(modelProduct, viewProduct);
  
  controllerProduct.initialize();
};
