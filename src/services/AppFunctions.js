import { v4 as uuidv4 } from "uuid";

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
      .map((i) => parseInt(i.price) * parseInt(i.quantity))
      .reduce((a, b) => a + b, 0);

    const acquiredItems = this.getOnlyAcquiredItems(
      this.getSavedListInLocalStorage()
    );
    const acquiredItemsPrices = acquiredItems.map(
      (i) => parseInt(i.price) * parseInt(i.quantity)
    );

    const sumAcquired = acquiredItemsPrices.reduce((a, b) => a + b, 0);
    const sumNonAcquired = sum - sumAcquired;
    const res = [sumAcquired, sumNonAcquired];
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

  isPriceCorrect(price) {
    if (isNaN(price) || price <= 0 || price > 100000) {
      return false;
    }

    return true;
  }

  isNameCorrect(name) {
    const isANumber = !isNaN(name);

    if (
      typeof name == !"string" ||
      name.length < 3 ||
      name.length > 15 ||
      isANumber
    ) {
      return false;
    }

    return true;
  }

  isDataCorrect(name, price) {
    if (!this.isNameCorrect(name)) {
      alert("Please enter a valid name (3 - 15 characters) ");
      return false;
    }

    if (!this.isPriceCorrect(price)) {
      alert("Please enter a valid price (max 100 000)");
      return false;
    }
    return true;
  }

  addItem(text, price,quantity) {
    
      const savedList = this.getSavedListInLocalStorage();

      //add the item
      const defaultImgUrl =
        "https://clecardona.com/summer_camp/eika/mobel.jpeg";

      const newItem = new Product(
        uuidv4(),
        text.toUpperCase(),
        price,
        quantity,
        defaultImgUrl,
        false,
        Date.now()
      );
      const newList = [...savedList, newItem];
      this.saveListToLocalSorage(newList);
    
  }


  editItem(item, text, price,quantity){
    const savedList = this.getSavedListInLocalStorage();
    const itemToEdit = savedList.filter( (i) => {
      return i.id === item.id;
    })[0];


    if (text.length === 0) {
      itemToEdit.name = item.name;
    } else {
      if (!this.isNameCorrect(text)) {
        alert("Please enter a valid name (3 - 15 characters) ");
        return false
      } else {
        itemToEdit.name = text.toUpperCase();
      }
    }

    if (price === -999) {
      itemToEdit.price = item.price;
    } else {
        itemToEdit.price = price;
     
      }
    

    if (quantity) {
      itemToEdit.quantity = quantity;
    } else {
      itemToEdit.quantity = item.quantity;
    }

    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });

    const newList = [...otherProducts, itemToEdit];
    this.saveListToLocalSorage(newList);

    return true;
  }

  toggleCheck(item) {
    const product = { ...item };
    product.acquired = !product.acquired;
    const otherProducts = this.getRestOfTheListById(item.id);
    this.saveListToLocalSorage([...otherProducts, product]);
  }
}

export default new Methods();

class Product {
  constructor(id, name, price, quantity, url, acquired, timestamp) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.url = url;
    this.acquired = acquired;
    this.timestamp = timestamp;
  }
}
