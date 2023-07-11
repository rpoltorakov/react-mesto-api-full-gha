const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { errorMiddleware } = require('./utils/errorMiddleware');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(cookieParser());
app.use(requestLogger);

app.use(cors({
  credentials: true,
  origin: [
    'https://api.mesto.rpoltorakov.nomoredomains.work',
    'https://mesto.rpoltorakov.nomoredomains.work',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
}));

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening port ${PORT}`);
});
