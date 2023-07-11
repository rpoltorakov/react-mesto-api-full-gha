const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validatorUsersId,
  validatorUpdateUser,
  validatorUpdateAvatar,
} = require('../middlewares/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validatorUsersId, getUser);
router.patch('/me', validatorUpdateUser, updateUser);
router.patch('/me/avatar', validatorUpdateAvatar, updateAvatar);

module.exports = router;
