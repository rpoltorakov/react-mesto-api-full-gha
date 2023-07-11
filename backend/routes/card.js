const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validatorCardId,
  validatorCreateCard,
} = require('../middlewares/validators');

router.get('/', getCards);
router.post('/', validatorCreateCard, createCard);
router.delete('/:cardId', validatorCardId, deleteCard);
router.put('/:cardId/likes', validatorCardId, likeCard);
router.delete('/:cardId/likes', validatorCardId, dislikeCard);

module.exports = router;
