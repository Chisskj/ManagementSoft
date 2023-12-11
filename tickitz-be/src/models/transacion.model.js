const db = require("../configs/supabase");
const moment = require("moment");

const getTransaction = (transacion_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` SELECT
  transaction.id as transaction_id,
  movies.title AS movie_title,
  movies.release_date AS movie_date,
  cb."name" as cinemas_name,
  TO_CHAR(show.showdate, 'YYYY-MM-DD') AS show_date,
  show.showtime as show_time,
  movies.category AS movie_category,
  reservation.id as reservation_id,
  seat_rows_number.name AS seats,
  show.price AS price,
  transaction.status as status 
FROM 
  reservation 
  JOIN transaction ON reservation.transaction_id = transaction.id 
  JOIN seat ON reservation.seat_id = seat.id 
  JOIN show ON seat.show_id = show.id 
  JOIN cinemas ON show.cinemas_id = cinemas.id 
  join cinemasbrand cb on cinemas.cinemas_brand_id = cb.id
  JOIN movies ON show.movies_id = movies.id 
  JOIN seat_rows_number ON seat.id_seat_rows_number = seat_rows_number.id 
WHERE 
   transaction.id = $1
GROUP BY 
  transaction.id,
  movies.title, 
  movies.release_date, 
  cb.name,
  show.showtime, 
  show.showdate,
  reservation.id,
  movies.category, 
  seat_rows_number.name, 
  show.price,
 transaction.status
    `;
    const values = [transacion_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const createTransaction = (transacion_id, payment_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` update "transaction" set payment_id = $1, status = 'paid' where id = $2 RETURNING *
    `;
    const values = [payment_id, transacion_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const cekPayment = (payment_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` select name from payment p where id = $1
    `;
    const values = [payment_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getPayment = () => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` select * from payment p 
    `;
    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getAllTransaction = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` SELECT
  t.id as transaction_id,
  r.id as reservation_id,
  sh.showtime AS show_time, 
  TO_CHAR(sh.showdate, 'YYYY-MM-DD') AS show_date, 
  m.title AS movie_title, 
  cb.name AS cinemas_brand_name, 
  cb.image AS cinemas_brand_image, 
  m.category AS movie_category, 
  sn.name AS seats, 
  sh.price AS price, 
  t.status AS transaction_status 
FROM 
  transaction t 
  JOIN reservation r ON r.transaction_id = t.id 
  JOIN seat s ON s.id = r.seat_id 
  JOIN show sh ON sh.id = s.show_id 
  JOIN movies m ON m.id = sh.movies_id 
  JOIN cinemas c ON c.id = sh.cinemas_id 
  JOIN cinemasbrand cb ON cb.id = c.cinemas_brand_id 
  JOIN seat_rows_number sn ON sn.id = s.id_seat_rows_number 
WHERE 
  r.user_id = $1;
    `;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateStatusOrder = (transacion_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `UPDATE seat
    SET order_status_id = 2
    FROM reservation
    JOIN transaction ON reservation.transaction_id = transaction.id
    WHERE reservation.seat_id = seat.id
    AND transaction.id = $1 RETURNING *
    `;
    db.query(sqlQuery, [transacion_id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getTransaction,
  createTransaction,
  cekPayment,
  getPayment,
  updateStatusOrder,
  getAllTransaction,
};
