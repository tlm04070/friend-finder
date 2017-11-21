var personData = require('../data/friend');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(personData);
    });

    app.post("/api/friends", function (req, res) {
        var newPerson = req.body;
        personData.push(newPerson);
        var currentScore = newPerson.scores;
        // console.log(currentScore);
        console.log(personData);

        var bestMatch = function () {

            for (let i = 0; i < personData.length - 1; i++) {
                var currentFriendData = personData[i];
                console.log("last: " + currentFriendData.scores);

                for (let j = 0; j < currentFriendData.scores.length; j++) {
                    var currentFriendScore = currentFriendData.scores[j];
                    console.log("score: " + currentFriendScore);
                    console.log("new person score: " + currentScore[j]);
                    console.log("difference: " + Math.abs(parseInt(currentFriendScore) - parseInt(currentScore[j])));

                }
            }
        }
        bestMatch();



        res.json(personData);
    });
};