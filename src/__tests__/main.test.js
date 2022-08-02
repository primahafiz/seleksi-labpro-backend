const {Admin,Customer,RequestTransaction} = require('../models')
const TokenJWT = require('../utils/TokenJWT')
const Saldo = require('../utils/Saldo')
const bcrypt = require('bcrypt')

test('Login Test', async function() {
    const admin = await Admin.findOne({
        where : {
            Username : 'admin'
        }
    })
    const isPasswordCorrect = await bcrypt.compare('prima',admin.Password)
    expect(isPasswordCorrect).toBe(true);
  });

test('Register Data Test', async function() {
    const customer = await Customer.findOne({
        where : {
            Username : 'Fandi'
        }
    })
    expect(customer.Name).toBe('Fandi Sufandi');
    });

test('Request Transaction Test', async function() {
    const cnt = await RequestTransaction.findAll({
        where : {
            Username : 'Fandi'
        }
    })
    expect(cnt.length).toBe(10);
  });

test('Token JWT Test', function() {
    expect(TokenJWT.isTokenAdmin(TokenJWT.getTokenAdmin())).toBe(true);
    });