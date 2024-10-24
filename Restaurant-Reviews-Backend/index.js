const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
const {client} = require('./db');

const allowedOrigins = [
  'http://localhost:3000',
  'https://project05-restaurant-reviews.onrender.com'
];

const corsOptions = {
  origin:(origin, callback) => {
    if(!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    }else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(require('morgan')('dev'));

const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const reviewRouter = require('./routes/reviewRouter');
const commentRouter = require('./routes/commentRouter');

app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/comments', commentRouter);


const init = async () => {

  await client.connect();
  console.log('conncted to database');


  app.listen(PORT, () => {
    console.log('Your server is running on PORT' + PORT)
  })
}

init();