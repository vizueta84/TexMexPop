require('dotenv').config()
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const usersRouter = require('./routers/users');
const restaurantRouter = require('./routers/restaurants');
const ratingsController = require('./routers/ratings');
// const authRouter = require('./routers/auth');

const app = express();
const port = process.env.PORT || 4001;

app.use(cors())
app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/restaurants', restaurantRouter)
app.use('/ratings', ratingsController)
// app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Welcome to our server!')
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});