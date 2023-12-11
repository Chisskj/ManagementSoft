const db = require("../configs/supabase");

const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select id, email, first_name, last_name, role_id, phone, poin, image from users where id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateUsers = (client, req) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE users SET ";
    let values = [];
    let i = 1;
    const body = req.body;
    if (body.password) {
      delete body.password;
    }
    for (const [key, val] of Object.entries(body)) {
      sqlQuery += `${key} = $${i}, `;
      values.push(val);
      i++;
    }

    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(req.authInfo.id);
    console.log(sqlQuery);
    client.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const updateProfileImage = (client, req, fileLink) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE users SET ";
    let values = [];
    let i = 1;
    const body = req.body;
    if (body.password) {
      delete body.password;
    }
    for (const [key, val] of Object.entries(body)) {
      sqlQuery += `${key} = $${i}, `;
      values.push(val);
      i++;
    }
    if (req.file) {
      sqlQuery += `image = '${fileLink}', `;
    }

    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(req.authInfo.id);
    console.log(sqlQuery);
    client.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getPoin = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select poin from users where id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};
const updatePoin = (id, poin) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `update users set poin = $1 where id = $2 RETURNING poin`;
    db.query(sqlQuery, [poin, id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};
const deleteImage = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `UPDATE users SET image = NULL WHERE id = $1;`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getProfile,
  updateUsers,
  updatePoin,
  getPoin,
  updateProfileImage,
  deleteImage,
};
