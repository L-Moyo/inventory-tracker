

export default class item {
    constructor(id,name, listPrice) {
        this.id = id;
        this.name = name;
        this.listPrice = listPrice;
        this.quantity = 0;
        this.value = 0;
        
    }

    
}

export class shoppingListLine {

    constructor(name, quantity,listPrice) {
        this.name = name;
        this.quantity = quantity;
        this.listPrice = listPrice;
        this.total =quantity*listPrice;
    }

}






