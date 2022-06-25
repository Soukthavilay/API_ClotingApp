
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