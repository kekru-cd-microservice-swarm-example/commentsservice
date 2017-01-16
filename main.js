var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;        // set our port

var mongoHost = "10.1.6.210";
var mongoPort = "27017";
var mongoDB;
const COMMENTS_COLLECTION = "comments";

mongoClient.connect("mongodb://"+mongoHost+":"+mongoPort+"/test", function(err, db) {
    if(err) {
        console.log("No connection to Mongo " + mongoHost + ":" + mongoPort);
        process.exit(1);
    }

    mongoDB = db;
    console.log("Connected to Mongo DB " + mongoHost + ":" + mongoPort);
});

var router = express.Router();

router.get('/comments/:newsId', function(req, res) {
    var newsId = req.params.newsId;

    console.log(newsId);
    mongoDB.collection(COMMENTS_COLLECTION).find().toArray(function(err, comments) {
        res.json(comments);
    });

});


router.get('/createTestdata', function(req, res) {

    console.log("Create Testdata");
    var collection = mongoDB.collection(COMMENTS_COLLECTION);
    collection.drop();
    collection = mongoDB.collection(COMMENTS_COLLECTION);

    collection.insert({
        "newsid": "news-schnee",
        "text": "Hallo Welt",
        "autor": "Maxi"
    });

    collection.insert({
        "newsid": "news-schnee",
        "text": "Ab auf die Piste!",
        "autor": "Maxi Mera"
    });

    res.json({ message: 'ok' });
});



app.use('/api', router);
app.listen(port);
console.log('Server started on port ' + port);
