class DetailProduct{
    constructor(id,idProduct,idSize,quantity,price,colorHex,color){
        this.id=id;
        this.idSize=idSize;
        this.idProduct=idProduct;
        this.quantity=quantity;
        this.colorHex=colorHex;
        this.color=color;
        this.price=price;
    }
}
module.exports = DetailProduct;