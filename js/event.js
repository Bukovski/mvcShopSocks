const PATH = {
  IMAGE: "images/product/",
  DB: "db/data.json"
};


class Event {
  constructor() {
    this._listeners = [];
  }
  attach(listener) { //add to buffer array (_listeners)
    this._listeners.push(listener);
  }
  notify(args) {
    this._listeners.forEach(listener => { //pull out from buffer array (_listeners)
      listener(args);
    })
  }
}