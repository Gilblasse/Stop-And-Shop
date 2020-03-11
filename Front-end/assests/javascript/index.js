const itemsAdapter = new ItemAdapter("http://localhost:3000/items");
const mainTag = document.querySelector("main");
const logo = document.querySelector(".logo");

itemsAdapter.fetchItems();

logo.addEventListener("click", renderItems);

function renderItems() {
  mainTag.innerHTML = "";
  mainTag.appendChild(Item.wrapedInDomElmts);
  Item.addEventListeners();
}
