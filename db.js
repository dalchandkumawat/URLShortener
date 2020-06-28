var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dalchandkumawat:anisha@123@cluster0-uwhql.mongodb.net/shorten_url?retryWrites=true&w=majority";                   
module.exports = {
    GetId: function () {
        return MongoClient.connect(url).then(function (db) {
            var dbo = db.db("shorten_url");
            var collection = dbo.collection('shorten_url');
            return collection.findOne();
        }).then(function (items) {
            return items.id;
        });
    }
};

