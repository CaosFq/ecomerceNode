const Product = require("../models/product.model");
const AppError = require("../utils/appError");

exports.validProductById = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findOne({
        where: {
            id,
            status: true
        }
    })

    if (!product) {
        return next(new AppError('Products not found', 400))
    }
    req.product = product
    next()
}

// ? next =  sirve para decirle que siga ah la siguiente funcion.