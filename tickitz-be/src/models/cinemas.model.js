const db = require('../configs/supabase')

const getAllCinemas = (query) => {
    return new Promise((resolve, reject) => {
        let sql = `select c.id, c.address, c2."name" as cinema_name, c3."name" as city from cinemas c 
        left join cinemasbrand c2 on c.cinemas_brand_id = c2.id 
        left join city c3 on c.city_id = c3.id `;
        if(query.cityId !== undefined) {
            sql += `where c.city_id='${query.cityId}' `
        }
        if(query.cinemasBrandId !== undefined) {
            query.cityId ? sql += `and c.cinemas_brand_id='${query.cinemasBrandId}' ` :
            sql += `where c.cinemas_brand_id='${query.cinemasBrandId}' `
        }
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};

const getSingleCinemas = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `select c.address, c2."name" as cinema_name, c3."name" as city from cinemas c 
        left join cinemasbrand c2 on c.cinemas_brand_id = c2.id 
        left join city c3 on c.city_id = c3.id where c.id=$1`;
        db.query(sql, [params.id], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};

const addCinemas = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into cinemas(cinemas_brand_id, city_id, address) 
        values ($1, $2, $3) returning *`;
        const values = [data.cinemasBrandId, data.cityId, data.address ];
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};

const editCinemas = (data, params) => {
    return new Promise((resolve, reject) => {
        console.log(data.address);
        const dataAvail = [];
        if (data.cinemasBrandId != null) {
            dataAvail.push('cinemas_brand_id=')
        }
        if (data.cityId != null) {
            dataAvail.push('city_id=')
        }
        if (data.address != null) {
            dataAvail.push('address=')
        }
       
        const dataQuery = dataAvail.map((data, i) => (`${data}$${i + 1}`)).join(`, `)
        const rawValues = [data.cinemasBrandId, data.cityId, data.address, params.id ];
        const values = rawValues.filter(d => d);
        let sql = `update cinemas set ${dataQuery} where id=$${values.length} RETURNING *`;
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deleteCinemas = (params) => {
    return new Promise((resolve, reject) => {
        const sql = `delete from cinemas where id=$1`;
        db.query(sql, [params.id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }
        );
    });
};

module.exports = {
    getAllCinemas,
    getSingleCinemas,
    addCinemas,
    editCinemas,
    deleteCinemas
}