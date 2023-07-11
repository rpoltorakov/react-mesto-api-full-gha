const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./card');
const { validatorLogin, validatorCreateUser } = require('../middlewares/validators');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/NotFoundError');

router.post('/signin', validatorLogin, login);
router.post('/signup', validatorCreateUser, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
