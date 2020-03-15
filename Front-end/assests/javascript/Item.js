class Item {
  static all = [];

  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.image = item.image;
    this.stock = item.stock;
    Item.all.push(this);
  }



  // =================================
  // LISTENS ON ALL STORE ITEM EVENTS
  // =================================
  static addEventListeners() {
    const wrapper = document.querySelector(".itemWrapper");
    wrapper.addEventListener("click", e => {
      let elmt = e.target.classList[0];
      e.preventDefault()
      let target = {
        "card-img-top": Item.showPage,
        btn: Item.incrementor,
        increment: Item.incrementor,
        decrementor: Item.decrementor,
        "material-icons": Item.incrementOrDecrement
      };
      // debugger
      if (!!target[elmt]) target[elmt](e);
    });
  }




static incrementOrDecrement(e){
  const parentBtn = e.target.parentElement
  const parentClass = parentBtn.classList[0]

  const execute = {
    increment: Item.incrementor,
    decrementor: Item.decrementor,
  }
  execute[parentClass](parentBtn);
}

  static decrementor(e) {
    const btn = e.target || e
    const cartId = currentUser.cart.id
    CartItemService.DeleteItemFromCartItems(cartId,btn.dataset.itemid)
  }

  static incrementor(e){
    const btn = e.target || e
    currentUser.addItemToCart(btn.dataset.itemid)
  }

  static updateItemCard(){
      currentUser.cartItems.forEach( item =>{
          const itemQTY = Cart.getItemQty(item.id)
          const updatedBtnHTML = Item.addItemBtnOrCounter(item,itemQTY)
          const itemCard = document.getElementById(item.id)

          if(!!itemCard){
            const itemCardBtn = itemCard.querySelector('div')
            itemCardBtn.outerHTML = updatedBtnHTML
          }
      
      })

    Item.compareStoreItemsToCart()
  }

  static compareStoreItemsToCart(){
    let storeItems = Object.values(document.querySelectorAll('.itemWrapper button#min')).map(item => item.dataset.itemid)
    let shoppingCartItems = Object.values(document.querySelectorAll('.cart-items-container .material-icons')).map(item => item.dataset.itemid)
    
    for(const storeItemID of storeItems){
      if (!shoppingCartItems.includes(storeItemID)){
        const item = Item.findItem(storeItemID)
        const updatedBtnHTML = Item.addItemBtnOrCounter(item)
        const itemCardBtn = document.getElementById(item.id).querySelector('div')
        itemCardBtn.outerHTML = updatedBtnHTML
      }
    }
    
  }

  static createAddBtn(e,item){
    const card = e.target.offsetParent
    card.outerHTML = Item.itemCard(item)
  }


  // static createCounterBtn(e) {
  //   const divTag = e.target.parentElement;
  //   // Cart.changeBtnValue(e,(total,itemPrice)=> total += itemPrice)
  //   divTag.innerHTML = `
  //     <div class="d-flex">
  //       <button type="button" id="min" class="decrementor btn btn-light">-</button>
  //       <p class="flex-grow-1">1</p>
  //       <button type="button" id="max" class="increment btn btn-light">+</button>
  //     </div>
  //   `;
  // }

  static findItem(id) {
    return Item.all.find(item => item.id == id);
  }

  static showPage(e) {
    const itemContainer = document.querySelector(".itemWrapper")
    const item = Item.findItem(e.target.id);
    // debugger
    itemContainer.innerHTML = Item.itemCard(item)
    Cart.updateShoppingCart()
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
          
          <section class="card-body">
            <h5 class="card-title text-center">${item.name}</h5>
            <h5 class="card-text text-center">$${item.price}</h5>
            ${Item.addItemBtnOrCounter(item)}
          </section>
        </div>
      `;
  }



  static addItemBtnOrCounter(item,itemQTY = 0) {
    if (itemQTY > 0){
      return `
        <div class="d-flex">
          <button type="button" id="min" data-itemId="${item.id}" class="decrementor btn btn-outline-secondary btn-lg">
            <i class="material-icons">
              remove
            </i>
          </button>
          <p class="flex-grow-1 text-center item-qty">${itemQTY}</p>
          <button type="button" id="max" data-itemId="${item.id}" class="increment btn btn-outline-secondary btn-lg">
            <i class="material-icons">
              add
            </i>
          </button>
        </div>
      `
    }else{
      return `
        <div class="text-center mt-4">
          <a class="btn btn-success" data-itemId="${item.id}" return false>Add To Cart</a>
        </div>
      `
    }
  }


}