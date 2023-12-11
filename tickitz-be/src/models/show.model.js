const db = require("../configs/supabase");
const addShow = (body) => {
  return new Promise((resolve, reject) => {
    const sql = `insert into "show" (movies_id, cinemas_id, showdate, showtime, price) 
        values($1, $2, $3, $4, $5) returning *`;
    const values = [
      body.moviesId,
      body.cinemasId,
      body.showdate,
      body.showtime,
      body.prices,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getSingleShow = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `select s.id, m.title, s.showdate, s.showtime, s.price, c.address, c3."name", c2."name" from "show" s 
        left join cinemas c on s.cinemas_id = c.id 
        left join cinemasbrand c2 on c.cinemas_brand_id = c2.id 
        left join movies m on s.movies_id = m.id 
        left join city c3 on c.city_id = c3.id 
        where s.id=$1;`;
    db.query(sql, [params.id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getAllShow = (city_name, movie_id) => {
  return new Promise((resolve, reject) => {
    let sql = `  SELECT s.id, cb.image AS cinema_brand_image, c.address, cb.name AS cinema_title, c.address AS cinema_address, 
        s.showtime AS cinema_showtime, s.showdate as cinema_showdate, s.price
        FROM show s
        JOIN cinemas c ON s.cinemas_id = c.id
        JOIN city ct ON c.city_id = ct.id
        JOIN cinemasbrand cb ON c.cinemas_brand_id = cb.id
        WHERE ct.name ILIKE $1::varchar and s.movies_id = $2::integer
            `;
    console.log(sql);
    const values = [city_name, movie_id];
    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const editShow = (data, params) => {
  return new Promise((resolve, reject) => {
    const dataAvail = [];
    if (data.moviesId != null) {
      dataAvail.push("movies_id=");
    }
    if (data.cinemasId != null) {
      dataAvail.push("cinemas_id=");
    }
    if (data.showdate != null) {
      dataAvail.push("showdate=");
    }
    if (data.showtime != null) {
      dataAvail.push("showtime=");
    }
    if (data.prices != null) {
      dataAvail.push("price=");
    }
    const dataQuery = dataAvail.map((data, i) => `${data}$${i + 1}`).join(`, `);
    const rawValues = [
      data.moviesId,
      data.cinemasId,
      data.showdate,
      data.showtime,
      data.prices,
      params.id,
    ];
    const values = rawValues.filter((d) => d);
    let sql = `update show set ${dataQuery} where id=$${values.length} RETURNING *`;
    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteShow = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `delete from show where id=$1`;
    db.query(sql, [params.id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getLocation = (movie_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT city.name AS location
    FROM movies
    JOIN show ON movies.id::integer = show.movies_id::integer
    JOIN cinemas ON show.cinemas_id::integer = cinemas.id::integer
    JOIN city ON cinemas.city_id::integer = city.id::integer
    WHERE movies.id::integer = $1::integer`;
    db.query(sql, [parseInt(movie_id)], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  addShow,
  getAllShow,
  editShow,
  getSingleShow,
  deleteShow,
  getLocation,
};
