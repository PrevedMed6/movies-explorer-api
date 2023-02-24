const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

function updateUser(userId, fields, options) {
  return User.findByIdAndUpdate(userId, fields, options)
    .then((user) => user)
    .catch((err) => Promise.reject(err));
}

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.send({
          data: {
            name: user.name,
            email: user.email,
          },
        });
      })
      .catch((err) => {
        next(err);
      }),
  );
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({
          message: 'Авторизация успешна',
        })
        .end();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt')
    .send({
      message: 'Вы вышли',
    })
    .end();
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
