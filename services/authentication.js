const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
};

const validateToken = (token) => {
  const payload = JWT.verify(token, secret);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
