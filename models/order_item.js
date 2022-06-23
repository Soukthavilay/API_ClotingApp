class OrderItem{
    constructor(id,orderId, productId,quantity,price){
       this.id=id;
       this.orderId=orderId;
       this.productId=productId;
       this.quantity=quantity;
       this.price=price;
    }
}
module.exports = OrderItem;