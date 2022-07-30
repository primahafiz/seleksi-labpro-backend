const {Admin, Customer, RequestTransaction, TransferTransaction} = require('../models')

module.exports = {
    async initData(){
        // check if table is empty
        const cnt = await Customer.count()

        if(cnt == 0){
            // make admin
            const admin = await Admin.create({
                Username : 'admin',
                Password : '$2b$10$WWGwLTmRTYeEG0LJASdRJOMWcd6Xl8yZ8.nh.G/S1mNIsyYQHypMO',
                Name : 'Prima'
            })

            // make customer
            const usernames = ['Andi', 'Budi', 'Cecep', 'Dodi', 'Fandi', 'Hari', 'Muhammad', 'Neneng', 'Prima', 'Roy' ]
            const names = ['Andi Surandi', 'Budi Suradi', 'Cecep Sucecep', 'Dodi Sudodi', 'Fandi Sufandi', 'Hari Suhari', 'Muhammad Rafi', 'Neneng Suneneng', 'Primanda Hafiz', 'Roy Suroyo' ]
            const password = '$2b$10$.uTg41Ok9Q/9Uo2p39igHOKR4fCmmQBVUh7bqQGUhMK/KHthwRL2C'
            const photo = 'https://storage.cloud.google.com/bnmo-data/ktm-13520022 (1).jpg_1659091944470'

            for(let i=0;i<10;i++){
                const customer = await Customer.create({
                    Username : usernames[i],
                    Name : names[i],
                    Password : password,
                    Photo : photo,
                    IsProceed : true,
                    IsAccepted : true
                })
            }

            // make request transaction
            const currencies = ['USD', 'IDR', 'EUR', 'AUD', 'INR', 'KRW', 'JPY', 'AED', 'BTC', 'LYD']
            const mnm = 0
            const mxm = 100
            for(let i=0;i<10;i++){
                for(let j=0;j<5;j++){
                    const reqData = await RequestTransaction.create({
                        Username : usernames[i],
                        RequestValue : Math.floor(Math.random() * (mxm - mnm) + mnm),
                        RequestCurrency : currencies[j],
                        IsProceed : false,
                        IsAccepted : false
                    })
                }
                for(let j=5;j<10;j++){
                    const reqData = await RequestTransaction.create({
                        Username : usernames[i],
                        RequestValue : Math.floor(Math.random() * (mxm - mnm) + mnm),
                        RequestCurrency : currencies[j],
                        IsProceed : true,
                        IsAccepted : true
                    })
                }
            }

            // make transfer transaction
            for(let i=0;i<10;i++){
                const transData = await TransferTransaction.create({
                    UsernameSender : usernames[i],
                    UsernameReceiver : usernames[(i+1)%10],
                    TransferValue : Math.floor(Math.random() * (mxm - mnm) + mnm),
                    TransferCurrency : 'USD'
                })
            }
        }
    }
}