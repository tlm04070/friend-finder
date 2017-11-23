var personData = require('../data/friend');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(personData);
    });

    app.post("/api/friends", function (req, res) {
        var newPerson = req.body;
        personData.push(newPerson);

        var currentScore = newPerson.scores;
        var currentPhoto = newPerson.photo;

        let inputScore = [];
        let sumTotal = [];
        let personArray = [];
        for (let i = 0; i < currentScore.length; i++) {
            var newScore = parseInt(currentScore[i]);
            inputScore.push(newScore);
        }
        var inputSum = inputScore.reduce((a, b) => a + b, 0);
        console.log(inputSum);
        var bestMatch = function () {

            for (let i = 0; i < personData.length - 1; i++) {
                var currentFriendData = personData[i];
                console.log("last: " + currentFriendData.scores);
                var friendPhoto = currentFriendData.photo;
                console.log("photo :" + friendPhoto);
                var differenceArr = [];



                for (let j = 0; j < currentFriendData.scores.length; j++) {
                    var currentFriendScore = currentFriendData.scores[j];
                    console.log("score: " + currentFriendScore);
                    console.log("new person score: " + currentScore[j]);
                    console.log("difference: " + Math.abs(parseInt(currentFriendScore) - parseInt(currentScore[j])));
                    var difference = Math.abs(parseInt(currentFriendScore) - parseInt(currentScore[j]));
                    differenceArr.push(difference);

                }
                console.log(differenceArr);
                var sum = differenceArr.reduce((a, b) => a + b, 0);
                console.log(sum);
                sumTotal.push(sum);
                var personInfo = {
                    name: personData[i].name,
                    photo: friendPhoto,
                    difference: sum
                };
                personArray.push(personInfo);


            }

            for (let u = 0; u < personArray.length; u++) {
                var totalDif = parseInt(personArray[u].difference);

                if (Math.abs(inputSum - totalDif) > 5) {
                    console.log("difference less than 20: " + personArray[u].name + " photo: " + personArray[u].photo);
                };
            }

        }
        bestMatch();

        console.log(sumTotal);

        res.json(personData);
    });
};