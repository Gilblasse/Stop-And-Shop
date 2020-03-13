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
        .then(res => res.json())
        // .then(this.handleCartObj)
    }

    static getUpdateCart(cart_id){
        return fetch(`${this.baseUrl}/${cart_id}`)
        .then(res => res.json())
        .then(cart => cart)
    }

    // static handleCartObj(){

    // }

}