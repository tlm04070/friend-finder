const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var PORT = process.env.PORT || 3005;


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("listening on port: " + PORT)
});