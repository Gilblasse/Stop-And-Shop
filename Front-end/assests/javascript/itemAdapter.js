class ItemAdapter {
  constructor(url) {
    this.baseUrl = url;
  }

  // RETRIEVE ALL ITEMS AND DISPLAY THEM IN THE STORE
  fetchItems() {
    fetch(this.baseUrl)
      .then(resp => resp.json())
      .then(obj => {
        obj.forEach(item => new Item(item));
        renderItems()
      });
    mainTag.innerHTML = spinner // While Items are being retrieved Spinner Will Appear on Page
  }

  PostItems(item) {
    const configObj = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(item)
    };

    fetch(this.baseUrl, configObj)
      .then(resp => resp.json())
      .then(itemObj => console.log(itemObj));
  }


}
