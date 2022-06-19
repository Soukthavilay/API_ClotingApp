class Product{
    constructor(id,nameProduct,descProduct,priceProduct,create_at,modified_at,
        stockProduct,categoryId){
            this.id = id;
            this.nameProduct = nameProduct;
            this.descProduct = descProduct;
            this.priceProduct = priceProduct;
            this.create_at = create_at;
            this.modified_at = modified_at;
            this.stockProduct = stockProduct;
            this.categoryId = categoryId;
    }
}

module.exports = Product