export class LocalStorageService<T> {
    constructor(private key: string) {

    }

    saveItemsToLocalStorage(items: Array<T> | T) {
        const savedItems = localStorage.setItem(this.key, JSON.stringify(items));
        return savedItems;
    }
    getItemsFromLocalStorage(key?: string) {
        const savedItems = null;
        if (key != null) {
            const item = null;
            localStorage.setItem(key, JSON.stringify(key));
        } else {
            const savedContacts = JSON.parse(localStorage.getItem(this.key));
        }
        return savedItems;
    }
    clearItemFromLocalStorage(key?: string) {
        if (key != null) {
            const item = null;
            localStorage.setItem(key, JSON.stringify(item));
        } else {
            localStorage.clear();
        }
    }
}

