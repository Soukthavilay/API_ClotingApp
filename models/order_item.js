class OrderItem{
    constructor(id,orderId, detailProducId,quantity,price){
       this.id=id;
       this.orderId=orderId;
       this.detailProducId=detailProducId;

       this.quantity=quantity;
       this.price=price;
    }
}


module.exports = OrderItem;