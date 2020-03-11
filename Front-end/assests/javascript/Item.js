class Item {
  static all = [];

  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.image = item.image;
    this.qty = item.qty;
    Item.all.push(this);
  }

  static addEventListeners() {
    const wrapper = document.querySelector(".itemWrapper");
    wrapper.addEventListener("click", e => {
      let elmt = e.target.classList[0];

      let target = {
        "card-img-top": Item.showPage,
        btn: Item.createCounterBtn,
        increment: Item.incrementor
      };

      if (!!target[elmt]) target[elmt](e);
    });
  }

  static incrementor(e) {
    const incrementBtn = e.target;
    const card = incrementBtn.offsetParent;
    const pTag = incrementBtn.parentElement.children[1];
    let currentVal = parseInt(pTag.innerText);

    if (incrementBtn.id == "min") {
      if (--currentVal === 0) {
        const item = Item.findItem(card.id);
        card.outerHTML = Item.itemCard(item);
      } else {
        pTag.innerText = --currentVal;
      }
    } else {
      pTag.innerText = ++currentVal;
    }
  }

  static createCounterBtn(e) {
    const divTag = e.target.parentElement;
    divTag.innerHTML = `
      <div class="d-flex">
        <button type="button" id="min" class="increment btn btn-light">-</button>
        <p class="flex-grow-1">1</p>
        <button type="button" id="max" class="increment btn btn-light">+</button>
      </div>
    `;
  }

  static findItem(id) {
    return Item.all.find(item => item.id == id);
  }

  static showPage(e) {
    const item = Item.findItem(e.target.id);
    mainTag.innerHTML = Item.itemCard(item);
  }

  static get wrapedInDomElmts() {
    const itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "itemWrapper");

    const itemsWithElmts = Item.all.map(item => Item.itemCard(item));
    itemContainer.innerHTML = itemsWithElmts.join(" ");
    return itemContainer;
  }

  static itemCard(item) {
    return `
        <div id="${item.id}" class="card itemCard mx-auto mt-5">
          <a href="#show">
            <img class="card-img-top" src="${item.image}" alt="${item.name}"  id="${item.id}">
          </a>
          
          <div class="card-body">
            <h5 class="card-title text-center">${item.name}</h5>
            <h5 class="card-text text-center">$${item.price}</h5>
            <div class="text-center mt-4">
              <a class="btn btn-success" data-itemId="${item.id}">Add To Cart</a>
            </div>
          </div>
        </div>
      `;
  }
}
