const { db } = require("../../configs/server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../../utils/appError");

const createToken = (key) => {
  return jwt.sign({ key }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const token = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return next(new AppError(403, "Now allowed", req, res, next));
      }
      const token = createToken(Date.now() + user.name);
      res.json({
        token,
      });
    }
  );
};

const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // const user = await db.collection('User').get();

    // email exists
    const bcryptPsw = await bcrypt.hash(password, 12);

    const token = createToken(Date.now());

    await db.collection("User").doc().set({
      name,
      email,
      password: bcryptPsw,
    });

    res.status(200).json({
      message: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection("User");
    const data = await user.get();
    let userData = {};

    data.docs.forEach((doc) => {
      if (doc.data().email === email) {
        userData = {
          name: doc.data().name,
          email: doc.data().email,
          password: doc.data().password,
        };
      }
    });

    const correctPsw = await bcrypt.compare(password, userData.password);

    if (!userData.email || !correctPsw) {
      return next(
        new AppError(401, "Email or Password is wrong!", req, res, next)
      );
    }

    const accessToken = createToken(Date.now() + userData.name);
    const refreshToken = jwt.sign(
      { user: userData.name },
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    delete userData.password;

    res.status(200).json({
      message: "success",
      accessToken,
      refreshToken,
      data: {
        userData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new AppError(401, "Unauthenticated", req, res, next));
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return next(new AppError(403, "Now allowed", req, res, next));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  token,
  signUp,
  login,
  protect,
};
