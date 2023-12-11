const db = require("../configs/supabase");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // verifikasi ke db
    const sql =
      "SELECT id, role_id, password, phone, image FROM users WHERE email=$1";
    db.query(sql, [body.email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createToken = (token) => {
  return new Promise((resolve, reject) => {
    // verifikasi ke db
    const sqlQuery = `insert into tokens (token) values ($1)`;
    db.query(sqlQuery, [token], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getEmail = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select email from users where email = $1";
    db.query(sqlQuery, [body.email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createBlackList = (token) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `update tokens set blacklist = $1 where token = $2`;
    db.query(sqlQuery, [token, token], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const register = (data, hashedPassword, otp) => {
  console.log(data, hashedPassword, otp);
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into users (email, password, role_id, otp, status) values ($1, $2, $3, $4, $5) RETURNING email, phone`;
    // parameterized query
    const values = [
      data.email,
      hashedPassword,
      data.role_id || 1,
      otp,
      "Not Active",
    ];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const createOtp = (email, otp) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "UPDATE users set otp = $1 WHERE email = $2 RETURNING email";
    const values = [otp, email];
    db.query(sqlQuery, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getOtp = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select otp from users where email = $1";
    db.query(sqlQuery, [email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const verify = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "update users SET status = $1 where email = $2 RETURNING email, status";
    db.query(sqlQuery, ["active", email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const cekVerify = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select status from users where email = $1";
    db.query(sqlQuery, [email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getOtpWithOtp = (otp) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select otp from users where otp = $1";
    db.query(sqlQuery, [otp], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getBlackList = (token) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT blacklist FROM tokens WHERE token = $1`;
    db.query(sqlQuery, [token], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const forgot = (otp, password) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users set password = $1 where otp = $2`;
    db.query(sqlQuery, [password, otp], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getOldPassword = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select password from users where id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const changePassword = (newPassword, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users set password = $1 where id = $2`;
    db.query(sqlQuery, [newPassword, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  createToken,
  getEmail,
  getBlackList,
  register,
  createBlackList,
  getOtp,
  createOtp,
  forgot,
  getOtpWithOtp,
  verify,
  cekVerify,
  getOldPassword,
  changePassword,
};
