const {sequelize} = require('../models')
const {Customer} = require('../models')
const fs = require('fs')
const bcrypt = require('bcrypt')
const { Storage } = require("@google-cloud/storage");

module.exports = {
    async registerCustomer(req,res){

        let projectId = "seleksi-labpro"
        let keyFilename = "mykey.json"
        const storage = new Storage({
            projectId,
            keyFilename
        })
        const bucket = storage.bucket("bnmo-data")

        let url = ''

        try {
            console.log("File found, trying to upload...")

            let newFileName = `${req.file.originalname}_${Date.now()}`;

            const blob = bucket.file(newFileName)
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype
                  }
            })
    
            blobStream.on("finish", () => {
                console.log("Success")
            })
            url = 'https://storage.cloud.google.com/'+bucket.name+'/'+blob.name
            blobStream.end(req.file.buffer)
        }catch (error) {
            return res.send({
                error:'cannot upload file'
            })
        }

        try{
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const newCustomer = await Customer.create({
                Username : req.body.username,
                Password : hashedPassword,
                Name : req.body.name,
                Photo : url,
                IsProceed : false,
                IsAccepted : false
            })
            res.send({
                redirectPath : '/login'
            })
        }catch(err){
            console.log(err)
            res.send({
                error : 'Username already exists'
            })
        }
    }
}