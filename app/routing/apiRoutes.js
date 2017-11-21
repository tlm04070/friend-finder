var personData = require('../data/friend.js');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(personData);
    });

    app.post("/api/friends", function (req, res) {
        var newPerson = req.body;
        console.log(newPerson);
        personData.push(newPerson);

    });
};