const moviesModel = require('../models/movies.model')
const { uploaderMovies } = require("../utils/cloudinary");
const db = require("../configs/supabase");


const addMovies = async (req, res) => {
    try {
        const { body } = req;
        const result = await moviesModel.addMovies(body);
        const uploadImage = await uploaderMovies(req.file, "Movies", result.rows[0].id)
        const { data, err } = uploadImage
        if (err) throw { msg: err };
        const dataSend = {
            image: data.secure_url
        }
        const params = {
            id: result.rows[0].id
        }
        const updateImage = await moviesModel.editMovies(dataSend, params)
        res.status(201).json({
            data: updateImage.rows,
            msg: "Success add new movies"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

const getAllMovies = async (req, res) => {
    try {
        const { query } = req;
        const result = await moviesModel.getAllMovies(query);
        if (result.rows.length === 0) {
            return res.status(404).json({
                data: result.rows,
                msg: "Data not found"
            });
        }
        const newData = result.rows.filter((d, i, arr) => i === arr.findIndex(v => v.id === d.id))
        const meta = await moviesModel.getMetaMovies(query);
        res.status(200).json({
            data: newData,
            meta,
            msg: "Get movies data"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};

const getSingleMovies = async (req, res) => {
    try {
        const { params } = req;
        const result = await moviesModel.getSingleMovies(params)
        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Movies not found"
            });
        };
        res.status(200).json({
            data: result.rows,
            msg: "Get movies data"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

const editMovies = async (req, res) => {
    try {
        const { body, params } = req;
        const result = await moviesModel.editMovies(body, params)
        res.status(201).json({
            data: result.rows,
            msg: "Success update movies"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

const deleteMovies = async (req, res) => {
    try {
        const { params } = req;
        const result = await moviesModel.getSingleMovies(params)
        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Movies not found"
            });
        };
        await moviesModel.deleteMovies(params)
        res.status(201).json({
            data: result.rows,
            msg: "Success delete movies"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

const updateMoviesImage = async (req, res) => {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      let fileLink = "";
      if (!req.file) {
        return res.status(400).json({
          msg: "Only Use Allowed Extension (JPG, PNG, JPEG, WEBP)",
          data: null,
        });
      }
      if (req.file) {
        const fileName = req.authInfo.id;
        const upCloud = await uploaderUsers(req, "movies", fileName);
        fileLink = upCloud.data.secure_url;
      }
      const resultUserBio = await moviesModel.updateMoviesImage(
        client,
        req,
        fileLink
      );
      await client.query("COMMIT");
      res.status(200).json({
        msg: "Update Success...",
        data: resultUserBio.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    } finally {
      client.release();
    }
  };

module.exports = {
    getAllMovies,
    addMovies,
    getSingleMovies,
    editMovies,
    deleteMovies,
    updateMoviesImage,
}