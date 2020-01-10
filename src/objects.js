export const transaction = function(amount, counterPartName) {
    this.amount = amount;
    this.counterPartName = counterPartName
};

export class amountClass {

    static idCount = 0;
    id = null;
    amount = null;
    use = null;

    constructor(amount, use) {
        this.id = ++this.constructor.idCount;
        this.amount = amount;
        this.use = use
    }

}

export class particiantClass {

    static count = 0;
    id = null;
    isActive = true;
    img = '';
    amountToPay = null;
    amountPaid = 0;
    transactions = [];
    amounts = [];

    constructor(name) {
        this.name = name;
        this.id = ++this.constructor.count;
        this.img = "https://picsum.photos/50/50/?image=" + this.id;

        this.addAmount(new amountClass(null, null))
    }

    addTransaction(transaction) {
        this.transactions.push(transaction)
    }

    addAmount(amount) {
        this.amounts.push(amount);
        this.updateAmounts()
    }

    removeAmount(id) {

        let key = null;
        this.amounts.forEach(function(amount, idx) {
            if (amount.id === id) key = idx;
        });

        this.amounts.splice(key, 1);
        this.updateAmounts();
    }

    updateAmounts() {
        let amountPaid = 0;
        this.amounts.forEach(function(amount) {
            amountPaid += amount.amount
        });
        this.amountPaid = amountPaid
    }
}