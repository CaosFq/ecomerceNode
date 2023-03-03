const { Router } = require('express');
const { check } = require('express-validator');
const {
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
} = require('../controllers/product.controller');
const { protect } = require('../middlewares/auth/auth.middleware');
const { validProductById } = require('../middlewares/products.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findProducts);

router.get('/:id', validProductById, findProduct);

router.use(protect)

router.post('/', [
  check('title', 'The title require').not().isEmpty(),
  check('description', 'The description must be require').not().isEmpty(),
  check('quantity', 'The quantity require').isNumeric(),
  check('price', 'The price require').isNumeric(),
  check('categoryId', 'The categoryId require').isNumeric(),
  check('userId', 'The userId requerid').isNumeric(),
  validateFields
], createProduct);

router.patch('/:id', [
  check('title', 'The title require').not().isEmpty(),
  check('description', 'The description must be require').not().isEmpty(),
  check('quantity', 'The quantity require').isNumeric(),
  check('price', 'The price require').isNumeric(),
  validateFields,
  validProductById
], updateProduct);

router.delete('/:id', validProductById, deleteProduct);

module.exports = {
  productRouter: router
};
