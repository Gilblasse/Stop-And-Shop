class CartItemService {

    static baseUrl = "http://localhost:3000/cart_items";

    static DeleteItemFromCartItems(cartId,itemId) {
        const configObj = {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({cartId})
        }
        fetch(`${this.baseUrl}/${itemId}`, configObj)
        .then(res => res.json())
        .then(cart => currentUser.setCurrentCart(cart))
    }

}