class Cart {

    // static async currentCart(user){
    //     const current_cart = user.carts.find(cart => cart.attributes.checkout == false)
    //     let result = await CartAdapter.getUpdateCart(current_cart.id)
    //     console.log(result)
    // }

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
        
    }
}