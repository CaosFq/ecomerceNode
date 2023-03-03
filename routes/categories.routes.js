const { Router } = require("express")
const { check } = require("express-validator")
const { findCategories, findCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/categories.controller")
const { protect } = require("../middlewares/auth/auth.middleware")
const { validCategoryById } = require("../middlewares/category.middleware")
const { validateFields } = require("../middlewares/validateField.middleware")

const router = Router()

router.get('/', findCategories)

router.get('/:id', validCategoryById, findCategory)

router.use(protect)

router.post('/', [
    check('name', 'The name is require').not().isEmpty(),
    validateFields,
], createCategory)

router.patch('/:id', validCategoryById, updateCategory)

router.delete('/:id', validCategoryById, deleteCategory)

module.exports = {
    categorieRouter: router
}