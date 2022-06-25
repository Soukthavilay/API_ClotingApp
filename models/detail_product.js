class DetailProduct{
    constructor(id,idProduct,size,quantity,price,colorHex,color){
        this.id=id;
        this.size=size;
        this.idProduct=idProduct;
        this.quantity=quantity;
        this.colorHex=colorHex;
        this.color=color;
        this.price=price;
    }
}
module.exports = DetailProduct;