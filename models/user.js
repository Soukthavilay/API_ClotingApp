class User{
    constructor(id,username,address,password,mobilePhone,role) {
        this.id = id;
        this.username = username;
        this.address = address;
        this.password = password;
        this.mobilePhone = mobilePhone;
        this.role = role;
    }
}
module.exports = User;