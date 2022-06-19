class Order{
    constructor(id,created_at,modified_at,amount,status,name,address,userId,mobile){
        this.id = id;
        this.created_at = created_at;
        this.modified_at = modified_at;
        this.amount = amount;
        this.status = status;
        this.name = name;
        this.address = address;
        this.userId = userId;
        this.mobile = mobile;
    }
}

module.exports = Order;