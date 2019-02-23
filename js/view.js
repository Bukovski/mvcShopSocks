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

const ProductModalView = (() => {
  const _modalWindow = $(".modal");
  const _modalBack = $(".modal-background");
  const _modalClose = $(".modal__close");
  
  return class {
    constructor(model) {
      this._model = model;
      this.toogleModalWindowEvent = new Event();
    }
    
    showModalWindow() {
      _modalBack.fadeIn(500);
      _modalWindow.fadeIn(500);
      
      this.toogleModalWindowEvent.notify(true);
      
      _modalBack.on("click", () => {
        this.hideModalWindow();
      });
      
      _modalClose.on("click", () => {
        this.hideModalWindow();
      });
    }
    hideModalWindow() {
      _modalBack.fadeOut(500);
      _modalWindow.fadeOut(500);
  
      this.toogleModalWindowEvent.notify(false)
    }
    
    init() {
      this._model.orderBayButton.attach(() => {
        this.showModalWindow();
      });
    }
  }
})();

const ProductSizeView = (() => {
  const _sizeGrid = $(".size__grid");
  
  return class {
    constructor(model) {
      this._model = model;
      this.clickSize = new Event();
    }
    
    layoutSize(text, index, stock) {
      const outOfStock = (bool) => (bool) ? "" : "size__item--not-exist";
      
      return `<div class="size__item ${ outOfStock(stock) }" size-index="${ index }">${ text }</div>`;
    }
    
    bufferSize() {
      return this._model.dataSizeProduct
        .then(arr => arr.reduce((prevElem, curElem, index) => {
          return prevElem += this.layoutSize(curElem.size, index, curElem.stock);
        }, ""))
    }
    showSizeProduct(index, hideModalWindow) {
      this.bufferSize()
        .then(html => _sizeGrid.html(html))
        .then(() => {
          if (index) {
            $(`.size__item[size-index=${ index }]`).addClass("size__item--active")
          }
          if (this._model.isOpenedModalWindow) {
            hideModalWindow();
          }
        })
    }
    rebuildSizeProduct(hideModalWindow) {
      const currentSize = this._model.indexSizeProduct;
      
      this.showSizeProduct(currentSize, hideModalWindow);
    }
    
    init(hideModalWindow) {
      this._model.changeSize.attach(() => {
        this.rebuildSizeProduct(hideModalWindow);
      });
      
      const _self = this;
      
      _sizeGrid.on("click", ".size__item ", function () {
        const currentElem = $(this);
        const indexElem = currentElem.attr("size-index");
        const haveClass = currentElem.hasClass("size__item--not-exist");
        
        if (indexElem && !haveClass) {
          _self.clickSize.notify(indexElem);
        }
      });
    }
  }
})();

const ProductButtonView = (() => {
  const _bayButton = $(".bay__button");
  
  return class {
    constructor(model) {
      this._model = model;
      this.clickOnBayButton = new Event();
    }
    
    showBayButton() {
      this._model.productOutOfStock
        .then((stock) => {
          if (stock) {
            if(!_bayButton.hasClass("bay__button--block")) {
              _bayButton.addClass("bay__button--block")
            }
          } else {
            if(_bayButton.hasClass("bay__button--block")) {
              _bayButton.removeClass("bay__button--block")
            }
          }
        });
    }
    
    init() {
      const _self = this;
      
      _bayButton.on("click", function (event) {
        event.preventDefault();
        
        const currentElem = $(this);
        const haveClass = currentElem.hasClass("bay__button--block");
        
        if (!haveClass) {
          _self.clickOnBayButton.notify();
        }
      });
    }
  }
})();

const ProductColorNavigationView = (() => {
  const _colorGrid = $(".color__grid");
  const _descriptionTitle = $(".description__title");
  const _priceItem = $(".price__item");
  
  return class {
    constructor(model) {
      this._model = model;
      this.clickNavigateColor = new Event();
      this.resetDataPage = new Event();
    }
    
    layoutNavigateColor(color, title, index) {
      return `<div class="color__selection" color-index="${ index }">
          <a class="color__preview" title="${ title }" style="background-color: ${ color }"></a>
      </div>`;
    }
    
    showDescriptionProduct() {
      this._model.dataDescriptionProduct
        .then(obj => {
          _descriptionTitle.text(obj.title);
          _priceItem.text(obj.price + " ₽");
        })
    }
    
    bufferNavigateColor() {
      return this._model.navigateColor
        .then(arr => arr.reduce((prevElem, curElem, index) => {
          return prevElem += this.layoutNavigateColor(curElem.color, curElem.title, index);
        }, ""))
    }
    showNavigateColor(index) {
      this.bufferNavigateColor()
        .then(html => _colorGrid.html(html))
        .then(() => $(".color__selection").eq(index)
          .addClass("color__selection--active"))
    }
    rebuildDescriptionProduct(size, button) {
      const currentProduct = this._model.indexProduct;
      
      this.resetDataPage.notify(); //before displaying the page, reset the display data
      
      this.showDescriptionProduct();
      this.showNavigateColor(currentProduct);
  
      size();
      button();
    }
    
    init(size, button) {
      this.showDescriptionProduct();
      this.rebuildDescriptionProduct(size, button);
      
      this._model.changeProductColor.attach(() => {
        this.rebuildDescriptionProduct(size, button);
      });
      
      const _self = this;
      
      _colorGrid.on("click", ".color__selection", function () {
        const currentElem = $(this);
        const indexElem = currentElem.attr("color-index");
        const haveClass = currentElem.hasClass("color__selection--active");
        
        if (indexElem && !haveClass) {
          _self.clickNavigateColor.notify(indexElem);
        }
      });
    }
  }
})();

const CartView = (() => {
  const _cartOrders = $(".cart__orders");
  const _cartAmount = $(".cart__amount");
  
  return class {
    constructor(model) {
      this._model = model;
      this.clickRemoveProduct = new Event();
    }
    
    layoutProductCart(productObj, index) {
      return `
       <div class="cart__product">
        <div class="cart__image-grid">
          <img class="cart__image" src="${ PATH.IMAGE + productObj.image }" alt="${ productObj.title }">
        </div>
        <div class="cart__describe">
          <h3 class="cart__title">${ productObj.title }</h3>
          <ul class="cart__attribute">
            <li class="cart__details">Цвет: <span class="cart__item">${ productObj.color }</span></li>
            <li class="cart__details">Размер: <span class="cart__item">${ productObj.size }</span></li>
          </ul>
        </div>
        <div class="cart__price">${ productObj.price } ₽</div>
        <div class="cart__count">${ productObj.pieces } шт. <span class="cart__close" remove-product="${ index }">x</span></div>
      </div>
      `;
    }
    bufferProductCart(arrCartProduct) {
      return arrCartProduct.reduce((prevElem, curElem, index) => {
        return prevElem += this.layoutProductCart(curElem, index);
      }, "")
    }
    showProductCart(arrCartProduct) {
      const layoutCartProduct = this.bufferProductCart(arrCartProduct);
      
      _cartOrders.html(layoutCartProduct);
    }
    showAmountCart(arrCartProduct) {
      let amount = 0;
      
      arrCartProduct.forEach(obj => amount += (+obj.price * +obj.pieces));
      
      _cartAmount.text(amount + " ₽")
    }
    
    rebuildCart() {
      const arrCartProduct = this._model.cartData;
      
      this.showProductCart(arrCartProduct);
      this.showAmountCart(arrCartProduct);
    }
    
    init() {
      this.rebuildCart();
      
      this._model.addToCart.attach(() => {
        this.rebuildCart();
      });
      
      const _self = this;
      
      _cartOrders.on("click", ".cart__close", function() {
        const indexElem = $(this).attr("remove-product");
        
        _self.clickRemoveProduct.notify(indexElem);
      });
    }
  }
})();

class ProductView {
  constructor(model) {
    this._model = model;
    this.picturesView = new ProductPicturesView(model);
    this.modalView = new ProductModalView(model);
    this.sizeView = new ProductSizeView(model);
    this.buttonView = new ProductButtonView(model);
    this.colorNavigationView = new ProductColorNavigationView(model);
    this.cartView = new CartView(model);
  }
  
  show() {
    this.picturesView.init();
    this.sizeView.init(() => this.modalView.hideModalWindow());
    this.buttonView.init();
    this.modalView.init();
    this.colorNavigationView.init(
      () => this.sizeView.rebuildSizeProduct(),
      () => this.buttonView.showBayButton()
    );
    this.cartView.init();
  }
}
