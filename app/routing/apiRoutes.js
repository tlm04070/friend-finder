var personData = require("../data/friend");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(personData);
  });

  app.post("/api/friends", function(req, res) {
    var newPerson = req.body;
    personData.push(newPerson);

    var currentScore = newPerson.scores;
    var currentPhoto = newPerson.photo;

    let inputScore = [];
    let sumTotal = [];
    let personArray = [];
    let subArray = [];
    for (let i = 0; i < currentScore.length; i++) {
      var newScore = parseInt(currentScore[i]);
      inputScore.push(newScore);
    }
    var inputSum = inputScore.reduce((a, b) => a + b, 0);
    // console.log(inputSum);
    var bestMatch = function() {
      for (let i = 0; i < personData.length - 1; i++) {
        var currentFriendData = personData[i];
        //console.log("last: " + currentFriendData.scores);
        var friendPhoto = currentFriendData.photo;
        //console.log("photo :" + friendPhoto);
        var differenceArr = [];

        for (let j = 0; j < currentFriendData.scores.length; j++) {
          var currentFriendScore = currentFriendData.scores[j];
          //   console.log("score: " + currentFriendScore);
          //   console.log("new person score: " + currentScore[j]);
          //   console.log(
          //     "difference: " +
          //       Math.abs(parseInt(currentFriendScore) - parseInt(currentScore[j]))
          //   );
          var difference = Math.abs(
            parseInt(currentFriendScore) - parseInt(currentScore[j])
          );
          differenceArr.push(difference);
        }
        //console.log(differenceArr);
        var sum = differenceArr.reduce((a, b) => a + b, 0);
        //console.log(sum);
        sumTotal.push(sum);

        for (let u = 0; u < personArray.length; u++) {
          var totalDif = parseInt(personArray[u].difference);
          let sub = Math.abs(inputSum - totalDif);
          //console.log(sub);
          subArray.push(sub);
        }
        var personInfo = {
          name: personData[i].name,
          photo: friendPhoto,
          difference: sum
        };
        console.log("persondiff: " + personInfo.difference);
        //console.log("personInfo.difference: " + personInfo.difference);
        // let popped = personInfo.difference.pop();
        // console.log(popped);
        personArray.push(personInfo);
      }
    };
    bestMatch();

    function bubbleSort(a, par) {
      var swapped;
      do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
          if (a[i][par] > a[i + 1][par]) {
            var temp = a[i];
            a[i] = a[i + 1];
            a[i + 1] = temp;
            swapped = true;
          }
        }
      } while (swapped);
    }

    bubbleSort(personArray, "difference");

    for (i = 0; i < personArray.length - 1; i++) {
      console.log(personArray[i]);
    }
    var bestResult = personArray.shift();
    console.log("name: " + bestResult.name + " photo: " + bestResult.photo);
    // var bubbleSort = function() {
    //   console.log("in");
    //   for (var i = personArray.length - 1; i >= 0; i--) {
    //     console.log("stepped down");
    //     console.log(personArray[i].difference);
    //     //Number of passes
    //     for (var j = personArray.length - i; j > 0; j--) {
    //       //Compare the adjacent positions
    //       console.log("third step down");
    //       console.log(personArray[j].difference);
    //       console.log(personArray.difference[j]);
    //       if (personArray[j].difference < personArray[j - 1].difference) {
    //         //Swap the numbers
    //         console.log("into the logic level");
    //         var tmp = personArray[j].difference;
    //         console.log(temp);
    //         personArray.difference[j] = personArray.difference[j - 1];
    //         personArray.difference[j - 1] = tmp;
    //       }
    //     }
    //   }
    // };
    //bubbleSort();
    // console.log(subArray);

    // console.log(sumTotal);

    res.json(bestResult);
  });
};
