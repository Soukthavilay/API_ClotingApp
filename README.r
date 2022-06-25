
route : api
+ POST /user/register :
body :  username
        address
        password
        mobile 
        
+ POST /user/login :
body : username,password 
res auth 
+ GET /user :
header : 'auth-token'
return user infomation

route : api/product
get '/product' : return all product
get /product/:id : return productById


route : api/order
POST : / make order
header : auth-token
body : 
{
"mobile" : "0343409259",
"created_at" : "",
"status" : "",
"name" : "Nghia",
"amount" : 50,
"address" : "60 ngo si lien",
"order_items" : [
                 { "detail_product_id" : "8qp1tJBJ87kVLCPJYxX7", // lấy detail_product_id từ phần size 
                                                                    của productInfo để biết người mua mua size nào
                 "quantity" : "2",
                 "price" : 40
                  },
                 { "detail_product_id" : "9T4zGb7SoyD72CxcC3DY",
                 "quantity" : "2",
                 "price" : 40
                 }
                 ]

GET : / get myOrder 
header : auth-token