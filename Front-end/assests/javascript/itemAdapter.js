class ItemAdapter {
  constructor(url) {
    this.baseUrl = url;
  }

  fetchItems() {
    fetch(this.baseUrl)
      .then(resp => resp.json())
      .then(obj => {
        obj.forEach(item => new Item(item));
        renderItems();
      });
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
