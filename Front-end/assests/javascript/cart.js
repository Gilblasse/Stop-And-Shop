class Cart {

    static currentCartItems(user){
        let cart = Cart.currentCart(user)
        return cart.attributes.items
    }

    static updatedCart(updatedCart){
        return updatedCart
    }


    static changeBtnValue(e,func){
        const itemCard = e.target.offsetParent
        const itemPrice = Number(itemCard.querySelector('h5.card-text').innerText.slice(1))
        const cartTotal = cartBtn.querySelector('p');
        let total = Number(cartTotal.innerText.slice(1))
        let newValue = func(total,itemPrice)
        cartTotal.innerText = `$${newValue.toFixed(2)}`
    }

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
    }

    static handleShoppingCartEvent(e){
        if (e.target.className == 'material-icons'){
            const itemId = e.target.dataset.itemid
            const cartId = currentUser.cart.id
    
            CartItemService.DeleteItemFromCartItems(cartId,itemId)
        }
    }

    static cartItemDiv(item){
        return `
            <div>
                <p>
                    <span class="shopping-cart-item-name">${item.name}</span>&nbsp&nbsp&nbsp - &nbsp&nbsp&nbsp<span class="text-muted">$${item.price} x ${item.qty}</span> 
                    <span class="delete-item-bin">
                        <i class="material-icons" data-itemId="${item.id}">
                            delete_outline
                        </i>
                    </span>
                </p>
            </div>

        `
    }
      
}