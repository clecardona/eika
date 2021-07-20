class Methods {
  getStyleSelected() {
    let style = JSON.parse(localStorage.getItem("style"));
    if (style == null) {
      return false;
    }
    return style;
  }

  saveStyleSelected(style) {
    localStorage.setItem("style", JSON.stringify(style));
  }

  ///
  getSortBySelected() {
    let sortBy = JSON.parse(localStorage.getItem("sortBy"));
    if (sortBy == null) {
      return "timestamp";
    }
    return sortBy;
  }

  saveSortBySelected(sortBy) {
    localStorage.setItem("sortBy", JSON.stringify(sortBy));
  }
  ///

  getFilterSelected() {
    let filter = JSON.parse(localStorage.getItem("filter"));
    if (filter == null) {
      return false;
    }
    return filter;
  }

  saveFilterSelected(filter) {
    localStorage.setItem("filter", JSON.stringify(filter));
  }

  getSavedListInLocalStorage() {
    let localList = JSON.parse(localStorage.getItem("list"));
    if (localList == null) {
      return [];
    }
    return this.sortByTimestampOlderFirst(localList);
  }

  sortByTimestampOlderFirst(list) {
    return list.sort((a, b) => a.timestamp - b.timestamp);
  }

  sortByPrice(list) {
    return list.sort((a, b) => a.price - b.price);
  }

  sortByName(list) {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }

  getOnlyAcquiredItems(list) {
    return list.filter(function (i) {
      return i.acquired === true;
    });
  }

 /*  getItemTotal(item){
    return item.price*item.quantity
  } */

  getTotalPriceOfItems() {

    const sum = this.getSavedListInLocalStorage()
    .map((i) => parseInt(i.price)*parseInt(i.quantity)   )
      .reduce((a, b) => a + b, 0);

    const acquiredItems = this.getOnlyAcquiredItems(
      this.getSavedListInLocalStorage()
    );
    const acquiredItemsPrices = acquiredItems.map((i) => parseInt(i.price)*parseInt(i.quantity));

    const sumAcquired = acquiredItemsPrices.reduce((a, b) => a + b, 0);
    const sumNonAcquired =sum-sumAcquired
    const res = [sumAcquired,sumNonAcquired]
    //console.log(res)
    return res;
  }

  saveListToLocalSorage(list) {
    localStorage.setItem("list", JSON.stringify(list));
  }

  getItemById(id) {
    const savedList = this.getSavedListInLocalStorage();
    const product = savedList.filter(function (i) {
      return i.id === id;
    });
    return product[0];
  }

  getRestOfTheListById(id) {
    const otherProducts = this.getSavedListInLocalStorage().filter((i) => {
      return i.id !== id;
    });
    return otherProducts;
  }
}

export default new Methods();
