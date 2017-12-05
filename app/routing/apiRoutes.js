var personData = require("../data/friend");

//function to export
module.exports = function (app) {

  //get response from adress
  app.get("/api/friends", function (req, res) {
    res.json(personData);
  });

  //post data to the api 
  app.post("/api/friends", function (req, res) {

    //grabs input and puts it into an array 
    var newPerson = req.body;
    personData.push(newPerson);

    //sets the current score and photo from the grabbed input
    var currentScore = newPerson.scores;
    var currentPhoto = newPerson.photo;

    //initial setup of four arrays to be used 
    let inputScore = [];
    let sumTotal = [];
    let personArray = [];
    let subArray = [];

    //loop through the grabbed scores and push them to a new array 
    for (let i = 0; i < currentScore.length; i++) {
      var newScore = parseInt(currentScore[i]);
      inputScore.push(newScore);
    }

    //adds together all of the scores from the user
    var inputSum = inputScore.reduce((a, b) => a + b, 0);

    //runs the main function of the whole app
    var bestMatch = function () {

      //runs through the api array of objects and creates variables for their data, photo, and makes and array 
      for (let i = 0; i < personData.length - 1; i++) {
        var currentFriendData = personData[i];
        var friendPhoto = currentFriendData.photo;
        var differenceArr = [];

        //loops through the individual friends scores 
        for (let j = 0; j < currentFriendData.scores.length; j++) {

          //for each of the numbers, we subtract the user input from the friends
          var currentFriendScore = currentFriendData.scores[j];
          var difference = Math.abs(
            parseInt(currentFriendScore) - parseInt(currentScore[j])
          );

          //push the difference of each number into the specific array for each friend
          differenceArr.push(difference);
        }

        //adds up all of the differences in a single friends array
        var sum = differenceArr.reduce((a, b) => a + b, 0);
        sumTotal.push(sum);

        //loop through the array holding all of the friends data
        for (let u = 0; u < personArray.length; u++) {
          var totalDif = parseInt(personArray[u].difference);
          let sub = Math.abs(inputSum - totalDif);
          subArray.push(sub);
        }

        //creates an object per friend that has the name, photo, and difference of that friend
        var personInfo = {
          name: personData[i].name,
          photo: friendPhoto,
          difference: sum
        };
        console.log("persondiff: " + personInfo.difference);

        //push each friend object to the array 
        personArray.push(personInfo);
      }
    };
    //calls the function to run
    bestMatch();


    //a basic bubble sort function
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

    //call the bubblesort function on the array of friends to put them in order least to greatest in differences
    bubbleSort(personArray, "difference");

    for (i = 0; i < personArray.length - 1; i++) {
      console.log(personArray[i]);
    }

    //shifting the smallest number, being the leftmost, out of the array for best match
    var bestResult = personArray.shift();
    console.log("name: " + bestResult.name + " photo: " + bestResult.photo);

    //send the results of the shifted index 
    res.json(bestResult);
  });
};