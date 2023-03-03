const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('../controllers/error/error.controller');
const { productRouter } = require('../routes/product.routes');
const { usersRouter } = require('../routes/user.routes');
const { db } = require('../database/db');
const { categorieRouter } = require('../routes/categories.routes');
const { authRouter } = require('../routes/auth/auth.routes');
const AppError = require('../utils/appError');

class Server {
  constructor() {

    this.app = express();

    this.port = process.env.PORT || 3000;

    this.paths = {
      user: '/api/v1/users',
      products: '/api/v1/products',
      categories: '/api/v1/category',
      orders: '/api/v1/orders',
      auth: '/api/v1/auth'
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'))
    }
    this.app.use(cors());

    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.products, productRouter);

    this.app.use(this.paths.user, usersRouter);

    this.app.use(this.paths.categories, categorieRouter);
    // Ruta de validacion de token
    this.app.use(this.paths.auth, authRouter)

    this.app.all('*', (req, res, next) => {
      return next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
    })

    this.app.use(globalErrorHandler)
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

module.exports = Server;
