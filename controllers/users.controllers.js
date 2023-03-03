const User = require("../models/user.model");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: true
    }
  })

  res.status(200).json({
    status: 'success',
    message: 'Users successfully obtained',
    users
  });

})

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req

  res.status(200).json({
    status: 'success',
    message: 'User successfully obtained',
    user
  });

})

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req

  const { username, email } = req.body

  const updateUser = await user.update({
    username,
    email
  })

  res.status(200).json({
    status: 'success',
    message: 'the user was update successfully',
    updateUser
  });
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req
  const { currentPassword, newPassword } = req.body

  // ! 1. Mejorar en un middleware
  const verifPassword = await bcrypt.compare(currentPassword, user.password)

  if (!verifPassword) {
    return next(new AppError('Incorrect password', 401))
  }

  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangeAt: new Date()
  })

  res.status(200).json({
    status: 'sucsess',
    message: 'The user password wa updated successfully'
  })

})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: false })

  res.json({
    status: 'success',
    message: 'the user was delete succssefully'
  });
})
