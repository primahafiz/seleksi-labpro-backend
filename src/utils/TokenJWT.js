module.exports = {
    TOKEN_CUSTOMER : 'bearer customertkn',
    TOKEN_ADMIN : 'bearer admintkn',

    getTokenCustomer(){
        return this.TOKEN_CUSTOMER
    },

    getTokenAdmin(){
        return this.TOKEN_ADMIN
    },

    isTokenCustomer(token){
        return token == this.TOKEN_CUSTOMER
    },

    isTokenAdmin(token){
        return token == this.TOKEN_ADMIN
    }
}