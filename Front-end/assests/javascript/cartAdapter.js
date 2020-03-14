class CartAdapter {
    static baseUrl = 'http://localhost:3000/carts'
    
    static postToCart(cart_id, item_id){
        const configObj = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({item_id})
        }
        
       return fetch(`${this.baseUrl}/${cart_id}`, configObj)
    }


    static createNewCart(user_id){
        const configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({user_id})
        }

       fetch(`${this.baseUrl}`, configObj)
       .then(res => res.json())
       .then(cart => currentUser.setCurrentCart(cart))
    }


    static getUpdateCart(cart_id){
        return fetch(`${this.baseUrl}/${cart_id}`)
        .then(res => res.json())
        .then(cart => cart)
    }
}