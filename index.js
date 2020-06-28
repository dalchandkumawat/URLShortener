let express = require('express');
const { resolveInclude } = require('ejs');
let app = express();
let MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
const url = "mongodb+srv://dalchandkumawat:anisha@123@cluster0-uwhql.mongodb.net/shorten_url?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/result', function(req, res) {
    let shortenedURL=shortenURL(req.query.originalURL);
    res.render('pages/result',{shortenedURL:shortenedURL});
});
function shortenURL(originalURL) {
    async function getId() {
        var db = require('./db');
        let promise = new Promise((resolve, reject) => {
            db.GetId().then(function (items) {
                resolve(items);
            }, function (err) {
                console.error('The promise was rejected', err, err.stack);
                resolve(err);
            });
        });
        return await promise;
    }
    (async () => {
        var id= await getId();        
        let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let shorturl = "";
        while (id > 0) {
            shorturl = shorturl.concat(map[id % 62]);
            id = parseInt(id / 62);
        }
        id++;
        console.log(shorturl);
        return shorturl;
    })()
}
function getOriginalURL(shorturl) {
    let id = 0;
    for (let i = 0; i < shortURL.length(); i++) {
        if ('a' <= shortURL[i] &&
            shortURL[i] <= 'z')
            id = id * 62 + shortURL[i] - 'a';
        if ('A' <= shortURL[i] &&
            shortURL[i] <= 'Z')
            id = id * 62 + shortURL[i] - 'A' + 26;
        if ('0' <= shortURL[i] &&
            shortURL[i] <= '9')
            id = id * 62 + shortURL[i] - '0' + 52;
    }
    return id;
}
let server = app.listen(8081, function () {
   let port = server.address().port;   
   console.log("Example app listening at %s", port);
});


