class Cart {

    static currentCartItems(user){
        let cart = Cart.currentCart(user)
        return cart.attributes.items
    }

    // static updatedCart(updatedCart){
    //     return updatedCart
    // }


    // static changeBtnValue(e,func){
    //     const itemCard = e.target.offsetParent
    //     const itemPrice = Number(itemCard.querySelector('h5.card-text').innerText.slice(1))
    //     const cartTotal = cartBtn.querySelector('p');
    //     let total = Number(cartTotal.innerText.slice(1))
    //     let newValue = func(total,itemPrice)
    //     cartTotal.innerText = `$${newValue.toFixed(2)}`
    // }

    static sideBar(){
        let cartClasses = cartSideBar.classList
        if (cartClasses.contains("hide-shopping-cart")){
            cartClasses.replace("hide-shopping-cart","show-shopping-cart")
        }else{
            cartClasses.replace("show-shopping-cart","hide-shopping-cart")
        }
        Cart.updateShoppingCart()
    }


    static updateShoppingCart(){
        const cartItemsHTML = currentUser.cartItems.map(item => Cart.cartItemDiv(item))
        cartItemsContainer.innerHTML = cartItemsHTML.join(' ') 
        const cartTotalPTag = cartBtn.querySelector('p');
        const cartTotal = currentUser.cart.attributes.total
        if (cartTotal == 0){
            cartTotalPTag.innerText = `$0.00`
            checkoutBtn.disabled = true
        }else{
            cartTotalPTag.innerText = `$${cartTotal}`
            checkoutBtn.disabled = false
        }

        Item.updateItemCard()
    }

    static handleCheckoutEvent(){
        CartAdapter.checkoutRequest(currentUser.cart.id)
        .then(res => res.json())
        .then(newCart => {
            currentUser.setCurrentCart(newCart)
            mainTag.innerHTML = Cart.checkoutMessageDiv()
            const afterCheckoutBtn = document.querySelector('#afterCheckout')
            afterCheckoutBtn.addEventListener('click',handleLogoEvent)
        })
    }

    static handleShoppingCartEvent(e){
        if (e.target.className == 'material-icons'){
            const itemId = e.target.dataset.itemid
            const cartId = currentUser.cart.id
            
            CartItemService.DeleteItemFromCartItems(cartId,itemId)
        }
    }

    static getItemQty(itemId){
        const item = currentUser.allCartItems.find(cartItem => cartItem.item_id == itemId)
        return item.qty
    }

    static cartItemDiv(item){
        return `
            <div>
                <p>
                    <span class="shopping-cart-item-name">${item.name}</span>&nbsp&nbsp&nbsp - &nbsp&nbsp&nbsp<span class="text-muted">$${item.price} x ${Cart.getItemQty(item.id)}</span> 
                    <span class="delete-item-bin">
                        <i class="material-icons" data-itemId="${item.id}">
                            delete_outline
                        </i>
                    </span>
                </p>
            </div>

        `
    }

    static checkoutMessageDiv(){
        return `
            <div class="jumbotron text-center">
                <h1 class="display-3">Thank You!</h1>
                <p class="lead"><strong>Please check your email at <em>${currentUser.email}</em></strong> for a receipt of purchase.</p>
                <hr class="w-50">
                <p>Come Again Soon</p>
                <p class="lead afterCheckoutBtn">
                    ${afterCheckout.outerHTML}
                </p>
            </div>
        `
    }
      
}