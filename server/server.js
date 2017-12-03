const path = require('path');

const express = require('express');

const publicPath = path.join(__dirname, '../public');


//
// server
//
const app = express();
const port = process.env.PORT || 3000;

//
// express middleware
//
// set up static directory
app.use(express.static(publicPath));

//
// app server
//

/**
 * Starting the server
 * @param {String} port the server listens to
 * @param {function} callback for logging data to terminal
 */
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
