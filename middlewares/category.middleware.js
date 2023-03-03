const Categories = require("../models/categories.model");
const AppError = require("../utils/appError");

exports.validCategoryById = async (req, res, next) => {
    const { id } = req.params;

    const categories = await Categories.findOne({
        where: {
            id,
            status: true
        }
    })

    if (!categories) {
        return next(new AppError('Category not found', 400))
    }
    req.categories = categories
    next()
}
