const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/environment");

const authModels = require("../models/auth.model");

// const { error } = require("../utils/response");

const checkToken = (req, res, next) => {
  // ambil token dari header
  const bearerToken = req.header("Authorization");
  // via authorization header berbentuk bearer token
  // bearer namaToken
  // verifikasi token
  if (!bearerToken)
    return res.status(403).json({
      msg: "Silahkan Login Terlebih Dahulu",
    });

  const token = bearerToken.split(" ")[1];
  jwt.verify(token, jwtSecret, async (err, payload) => {
    // jika tidak, maka tolak akses
    if (err && err.name)
      return res.status(200).json({
        msg: err.message,
      });
    const blackList = await authModels.getBlackList(token);
    // console.log(blackList.rows);
    if (!blackList.rows[0]) {
      res.status(401).json({
        msg: "please login first",
      });
      return;
    }
    if (token === blackList.rows[0].blacklist) {
      res.status(401).json({
        msg: "please login first",
      });
      return;
    }
    if (err)
      return res.status(500).json({
        msg: err.message,
      });
    req.authInfo = {
      ...payload,
      token,
    };
    next();
  });
};

const checkRole = (req, res, next) => {
  const role = req.authInfo.role_id;
  if (role !== 1) {
    return res.status(403).json({
      msg: "Not allowed, Only admin should access.",
    });
  }
  next();
};

const checkVerify = async (req, res, next) => {
  const { email } = req.body;
  const result = await authModels.cekVerify(email);
  // return console.log(result);
  // if(result.)
  if (result.rows.length < 1) {
    return res.status(401).json({
      msg: "Account not found",
    });
  }
  if (result.rows[0].status === "Not Active") {
    return res.status(401).json({
      msg: "Please Verify Your Email",
    });
  }
  next();
};

module.exports = {
  checkToken,
  checkRole,
  checkVerify,
};
