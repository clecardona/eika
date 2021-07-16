class Methods {

  getStyleSelected() {
    let style = JSON.parse(localStorage.getItem("style"));
    if (style == null) {
      style = false;
    }
    return style;
  }

  saveStyleSelected(style) {
    localStorage.setItem("style", JSON.stringify(style));
  }

  getSortByPriceSelected() {
    let isSortedByPrice = JSON.parse(localStorage.getItem("isSortedByPrice"));
    if (isSortedByPrice == null) {
      isSortedByPrice = false;
    }
    return isSortedByPrice;
  }

  saveSortByPriceSelected(isSortedByPrice) {
    localStorage.setItem("isSortedByPrice", JSON.stringify(isSortedByPrice));
  }





  getFilterSelected() {
    let filter = JSON.parse(localStorage.getItem("filter"));
    if (filter == null) {
      filter = false;
    }
    return filter;
  }

  saveFilterSelected(filter) {
    localStorage.setItem("filter", JSON.stringify(filter));
  }
  
  getSavedListInLocalStorage() {
    let localList = JSON.parse(localStorage.getItem("list"));
    if (localList == null) {
      localList = [];
    }
    this.sortByTimestampOlderFirst(localList);

    return localList;
  }


  sortByTimestampOlderFirst(list) {
    return list.sort((a, b) => a.timestamp - b.timestamp);
  }

  sortByPrice(list) {
    return list.sort((a, b) => a.price - b.price);
  }

  getOnlyAcquiredItems(list) {
    return list.filter(function (i) {
      return i.acquired === true;
    });
  }

  saveListToLocalSorage(list) {
    localStorage.setItem("list", JSON.stringify(list));
  }
}

export default new Methods();
