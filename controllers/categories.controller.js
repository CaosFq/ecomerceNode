const Categories = require('../models/categories.model');
const catchAsync = require('../utils/catchAsync');

exports.findCategories = catchAsync(async (req, res, next) => {
    const categories = await Categories.findAll({
        where: {
            status: true
        }
    })

    res.status(200).json({
        status: 'success',
        message: 'The categorie found were successfully',
        categories
    });
})

exports.findCategory = catchAsync(async (req, res, next) => {
    const { categories } = req

    res.status(200).json({
        status: 'success',
        message: 'Category fetched succssfully',
        categories
    });

})

exports.createCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const newCategory = await Categories.create({
        name: name.toLowerCase()
    });

    res.status(201).json({
        status: 'success',
        message: 'The categorie was created successfully',
        newCategory
    });
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    const { categories } = req

    const { name } = req.body

    const updateCategorie = await categories.update({
        name
    })

    res.status(200).json({
        status: 'success',
        message: 'The categorie was fount update',
        updateCategorie
    });
})

exports.deleteCategory = catchAsync(async (req, res, next) => {

    const { categories } = req

    await categories.update({ status: false })


    res.status(200).json({
        status: 'success',
        message: 'The categorie has been delete succssfully'
    });
})