
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const galleryRouter = require('./routes/gallery.router');
const groomingRouter = require('./routes/grooming.router');
const petRouter = require('./routes/pet.router');
const userRouter = require('./routes/user.router');
const walkRouter = require('./routes/walk.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/gallery', galleryRouter);
app.use('/api/grooming', groomingRouter);
app.use('/api/pet', petRouter);
app.use('/api/user', userRouter);
app.use('/api/walk', walkRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


module.exports = app;