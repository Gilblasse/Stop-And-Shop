class User {

    constructor(userObj){
        this.id = userObj.data.id
        this.email = userObj.data.attributes.email
        this.carts = userObj.included
        this.cart = null
        this.cartItems = null
        this.allCartItems = null
        this.setCurrentCart()
        return this
    }

    async setCurrentCart(cart = null){
        if(!cart){
            const current_cart = this.carts.find(cart => cart.attributes.checkout == false)
            if (!current_cart){
                CartAdapter.createNewCart(this)
            }else{
                let result = await CartAdapter.getUpdateCart(current_cart.id)
                this.cart = result.data
                this.cartItems = this.cart.attributes.items
                this.allCartItems = this.cart.attributes.cart_items
                Cart.updateShoppingCart()
            }
        }else{
            this.cart = cart.data
            this.cartItems = this.cart.attributes.items
            this.allCartItems = this.cart.attributes.cart_items
            Cart.updateShoppingCart()
        }
        
    }

    
    async addItemToCart(itemId){
        CartAdapter.postToCart(this.cart.id, itemId)
        .then(res => res.json())
        .then(cart => {
            this.cart = cart.data
            this.cartItems = this.cart.attributes.items
            this.allCartItems = this.cart.attributes.cart_items
            Cart.updateShoppingCart()
        })

    }


    logout(){
        localStorage.removeItem("user_id")
        currentUser = null
        mainTag.innerHTML = userLoginform()
        const cartTotalPTag = cartBtn.querySelector('p');
        cartTotalPTag.innerText = `$0.00`
    }


    static authenticate(user){
        if (Object.keys(user).includes("error")){
            if(user.error !=  null){
                alert(user.error)
            }
            mainTag.innerHTML = userLoginform()
        }else{
            currentUser = new User(user)
            localStorage.setItem("user_id",currentUser.id)
            itemsAdapter.fetchItems();
            logoutBtn.style.visibility = "visible"
        }
    }


}