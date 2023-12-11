const cinemasModel = require('../models/cinemas.model')

const getAllCinemas = async (req, res) => {
    try {
        const { query } = req
        const result = await cinemasModel.getAllCinemas(query)
        if (result.rows.length === 0) {
            return res.status(404).json({
                data: result.rows,
                msg: "Data not found"
            });
        }
        res.status(200).json({
            data: result.rows,
            msg: "Get cinemas data"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    };
};

const getSingleCinemas = async (req, res) => {
    try {
        const { params } = req;
        const result = await cinemasModel.getSingleCinemas(params)
        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Cinemas not found"
            });
        };
        res.status(200).json({
            msg: "Get cinemas data",
            data: result.rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    };
};

const addCinemas = async (req, res) => {
    try {
        const { body } = req
        const result = await cinemasModel.addCinemas(body)
        res.status(200).json({
            data: result.rows,
            msg: "Success add new cinemas"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    };
};

const editCinemas = async (req, res) => {
    try {
        const { body, params } = req
        const result = await cinemasModel.editCinemas(body, params)
        res.status(200).json({
            data: result.rows,
            msg: "Success edit cinemas"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    };
};

const deleteCinemas = async(req, res) => {
    try {
        const { params } = req;
        const result = await cinemasModel.getSingleCinemas(params)
        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Cinemas not found"
            });
        };
        await cinemasModel.deleteCinemas(params)
        res.status(201).json({
            data: result.rows,
            msg: "Success delete cinemas"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}


module.exports = {
    getAllCinemas,
    getSingleCinemas,
    addCinemas,
    editCinemas,
    deleteCinemas
}