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
      e.preventDefault()
      let target = {
        "card-img-top": Item.showPage,
        btn: this.createCounterBtn,
        increment: this.incrementor
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
      let newValue = --currentVal
      if (newValue === 0) {
        Cart.changeBtnValue(e,(total,itemPrice)=> total -= itemPrice)
        const item = Item.findItem(card.id);
        card.outerHTML = Item.itemCard(item);
      } else {
        Cart.changeBtnValue(e,(total,itemPrice)=> total -= itemPrice)
        pTag.innerText = newValue;
      }
    } else {
      let newValue = ++currentVal
      Cart.changeBtnValue(e,(total,itemPrice)=> total += itemPrice)
      pTag.innerText = newValue;
    }
  }


  static createCounterBtn(e) {
    const divTag = e.target.parentElement;
    const itemId = e.target.dataset.itemid

    // currentUser.addItemToCart(itemId)
    Cart.changeBtnValue(e,(total,itemPrice)=> total += itemPrice)
  
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
              <a class="btn btn-success" data-itemId="${item.id} return false">Add To Cart</a>
            </div>
          </div>
        </div>
      `;
  }
}
