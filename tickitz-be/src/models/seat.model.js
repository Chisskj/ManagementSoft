const db = require("../configs/supabase");
const moment = require("moment");

const getSeat = (show_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT
  movies.title,
  cinemasbrand.name AS cinema_brand_name,
  cinemasbrand.image AS cinema_image,
  show.showtime AS show_time,
  TO_CHAR(show.showdate, 'YYYY-MM-DD') AS show_date,
  seat.id as seat_id,
  seat_rows_number.name AS seat,
  show.price,
  orderstatus.name AS status_order
  FROM
    movies
    JOIN show ON movies.id = show.movies_id
    JOIN cinemas ON show.cinemas_id = cinemas.id
    JOIN cinemasbrand ON cinemas.cinemas_brand_id = cinemasbrand.id
    JOIN seat ON show.id = seat.show_id
    JOIN seat_rows_number ON seat.id_seat_rows_number = seat_rows_number.id
    LEFT JOIN orderstatus ON seat.order_status_id = orderstatus.id
  WHERE
    show.id = $1
  ORDER BY seat.id
    `;
    const values = [show_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const orderSeat = (dataArray) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `INSERT INTO reservation (user_id, seat_id, transaction_id) VALUES`;
    const values = [];
    dataArray.forEach((data, idx) => {
      if (values.length) sqlQuery += ", ";
      sqlQuery += `($${1 + 3 * idx}, $${2 + 3 * idx}, $${3 + 3 * idx})`;
      console.log(data.transaction_id);
      values.push(data.id, parseInt(data.seat), data.transaction_id);
    });
    sqlQuery += ` RETURNING *`;
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const cekStatusSeat = (dataSeat) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT s.id, srn.name as seat, os.name as status 
      FROM seat s 
      JOIN seat_rows_number srn ON srn.id = s.id_seat_rows_number
      JOIN orderstatus os on os.id = s.order_status_id  
      WHERE s.id IN (`;
    const values = [];
    dataSeat.forEach((data, idx) => {
      if (idx !== 0) sqlQuery += ",";
      sqlQuery += `$${idx + 1}`;
      values.push(data.seat);
    });
    sqlQuery += ")";
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows);
    });
  });
};

const cekSeat = (dataSeat) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select id from seat  
      WHERE id IN (`;
    const values = [];
    dataSeat.forEach((data, idx) => {
      if (idx !== 0) sqlQuery += ",";
      sqlQuery += `$${idx + 1}`;
      values.push(data.seat);
    });
    sqlQuery += ")";
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows);
    });
  });
};

const createTransaction = () => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `insert into transaction (payment_id, status) values ($1, $2) RETURNING id, status`;
    const values = [null, "pending"];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows);
    });
  });
};

const cekCinema = (dataCinema) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select id, name from cinemas where id IN (`;
    const values = [];
    dataCinema.forEach((data, idx) => {
      if (idx !== 0) sqlQuery += ",";
      sqlQuery += `$${idx + 1}`;
      values.push(data.cinemas_id);
    });
    sqlQuery += ")";
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows);
    });
  });
};

module.exports = {
  getSeat,
  orderSeat,
  cekStatusSeat,
  cekCinema,
  cekSeat,
  createTransaction,
};
