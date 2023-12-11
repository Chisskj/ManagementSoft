const showModel = require("../models/show.model");

const addShow = async (req, res) => {
  try {
    const { body } = req;
    const result = await showModel.addShow(body);
    res.status(200).json({
      data: result.rows,
      msg: "Success add new show",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getLocation = async (req, res) => {
  try {
    // const { movie_id } = req.body;
    const { movie_id } = req.params;
    const result = await showModel.getLocation(movie_id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Location not found",
      });
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getAllShow = async (req, res) => {
  try {
    const { city_name, movie_id } = req.query;
    const result = await showModel.getAllShow(city_name, movie_id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        data: result.rows,
        msg: "Data not found",
      });
    }
    res.status(200).json({
      data: result.rows,
      msg: "Get movies data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getSingleShow = async (req, res) => {
  try {
    const { params } = req;
    const result = await showModel.getSingleShow(params);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Show not found",
      });
    }
    res.status(200).json({
      data: result.rows,
      msg: "Get show data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const editShow = async (req, res) => {
  try {
    const { body, params } = req;
    const result = await showModel.editShow(body, params);
    res.status(200).json({
      data: result.rows,
      msg: "Success edit show",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const deleteShow = async (req, res) => {
  try {
    const { params } = req;
    const result = await showModel.getSingleShow(params);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "show not found",
      });
    }
    await showModel.deleteShow(params);
    res.status(201).json({
      data: result.rows,
      msg: "Success delete show",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  addShow,
  getAllShow,
  editShow,
  getSingleShow,
  deleteShow,
  getLocation,
};
