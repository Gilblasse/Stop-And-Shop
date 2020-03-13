class User {

    constructor(userObj){
        this.id = userObj.data.id
        this.carts = userObj.included
        this.currentCart = null
        this.cart()
        return this
    }


    async cart(){
        const current_cart = this.carts.find(cart => cart.attributes.checkout == false)
        let result = await CartAdapter.getUpdateCart(current_cart.id)
        this.currentCart = result
    }

 
    cartItems(){
        return Cart.currentCartItems(this)
    }

    addItemToCart(itemId){
        CartAdapter.postToCart(this.currentCart.data.id,itemId)
    }

    logout(){
        localStorage.removeItem("user_id")
        currentUser = null
        mainTag.innerHTML = userLoginform()
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