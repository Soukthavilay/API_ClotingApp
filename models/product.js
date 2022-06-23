class Product{
    constructor(id,nameProduct,descProduct,priceProduct,create_at,modified_at,
        stockProduct,categoryId){
            this.id = id;
            this.nameProduct = nameProduct;
            this.descProduct = descProduct;
            this.create_at = create_at;
            this.modified_at = modified_at;
            this.categoryId = categoryId;
    }
}

module.exports = Product