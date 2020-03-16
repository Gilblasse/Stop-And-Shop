const itemsAdapter = new ItemAdapter("http://localhost:3000/items");
const mainTag = document.querySelector("main");
const logo = document.querySelector(".logo");
const cartBtn = document.querySelector('.shopping-cart')
const cartSideBar = document.createElement('aside')
const cartItemsContainer = document.createElement('section')
const checkoutBtn = document.createElement('button')
const afterCheckout = document.createElement('a')
const sortMenuBar = document.querySelector('.sort-menu-bar')
const loginform = document.createElement('div')
const logoutBtn = document.querySelector('#user-account')
const spinner = '<div id="spinner"><img src="https://help.presentations2go.eu/LTI/lib/Spinner.gif"></div>'
let currentUser = null
let user_id = localStorage.getItem('user_id')

const itemContainer = document.createElement("div");
itemContainer.setAttribute("class", "itemWrapper");

loginform.setAttribute('class',"form-group w-25 mx-auto")

cartSideBar.insertAdjacentHTML('afterbegin', '<h3>Shopping Cart: </h3>')

cartItemsContainer.setAttribute('class','cart-items-container')
cartSideBar.setAttribute('class','shoppingCart-sideBar')
checkoutBtn.setAttribute('class','btn btn-success btn-block w-75 mx-auto')
checkoutBtn.setAttribute('id','checkout')
checkoutBtn.innerText = 'Checkout'

cartSideBar.appendChild(cartItemsContainer)
cartSideBar.className += ' hide-shopping-cart'
cartSideBar.appendChild(checkoutBtn)


afterCheckout.setAttribute('class','btn btn-primary btn-sm')
afterCheckout.setAttribute('id','afterCheckout')
afterCheckout.innerText = 'Continue Shopping ?'

logo.addEventListener("click", handleLogoEvent);
// afterCheckout.addEventListener('click', handleLogoEvent)
cartBtn.addEventListener('click', Cart.sideBar)
cartSideBar.addEventListener('click', Cart.handleShoppingCartEvent)
mainTag.addEventListener('click', loginUser)
logoutBtn.addEventListener('click', handleLogoutEvent)
checkoutBtn.addEventListener('click', Cart.handleCheckoutEvent)
sortMenuBar.addEventListener('click', Item.handleSortEvent)

UserAdapter.getUser(user_id)

            



function handleLogoutEvent() {
  if(currentUser){
    currentUser.logout()
  }
}

function handleLogoEvent(){
  if(currentUser){
    Cart.sideBar();
    renderItems();
    Cart.updateShoppingCart()
    
  }
}

function handleCartBtnEvent() {
  if(currentUser){
    Cart.sideBar();
  }
}


// THIS DISPLAYS ALL STORE ITEMS ON THE PAGE
function renderItems() {
  mainTag.innerHTML = "";
  mainTag.appendChild(Item.wrapedInDomElmts);
  Item.addEventListeners();
  mainTag.appendChild(cartSideBar)
  // Cart.updateShoppingCart()
  // debugger
  
}


function loginUser(e){
  if(e.target.id == "login"){
    obj = {}
    const inputTags = Object.values(mainTag.querySelectorAll('input'))
    inputTags.forEach(tag => obj[tag.name] = tag.value)
    UserAdapter.postLogin(obj)
  }
}

function userLoginform(){
  logoutBtn.style.visibility = "hidden"
  loginform.innerHTML = `
    <label for="email">Email</label>
    <input id="email" class="form-control mb-3" type="email" name="email">

    <label for="password">Password</label>
    <input id="password" class="form-control mb-5" type="password" name="password">

    <div class="text-center">
      <a id="login" href="#" class="btn btn-success">SignUp / Login</a>
    </div>
  `
  return loginform.outerHTML
}
