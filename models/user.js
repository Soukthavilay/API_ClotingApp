class User{
    construct(id,username,address,password,role) {
        this.id = id;
        this.username = username;
        this.address = address;
        this.password = password;
        this.role = role;
    }
}
module.exports = User;