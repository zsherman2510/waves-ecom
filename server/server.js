const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes')
const passport = require('passport')
const {jwtStrategy} = require('./middleware/passport')
const {handleError, convertToAPIError} = require('./middleware/apiError')


const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
app.use(express.json())

app.use(xss())
app.use(mongoSanitize())

app.use('/api', routes)
//handle errors
app.use(convertToAPIError);
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use((err, req, res, next) => {
  handleError(err, res);
});
const port =  process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})