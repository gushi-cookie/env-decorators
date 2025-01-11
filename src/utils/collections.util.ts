export namespace arrays {
    /**
     * Remove an item from an array and return its index that
     * the item was holding.
     * @param array - array from which the item should be removed.
     * @param item - the item to remove.
     * @returns index the item was holding or -1 if the items wasn't found.
     */
    export function removeItem<T>(array: Array<T>, item: T): number {
        let index = array.indexOf(item);
        if(index < 0) return -1;
        array.splice(index, 1);
        return index;
    }
}