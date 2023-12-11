const transactionModel = require("../models/transacion.model");
const db = require("../configs/supabase");
const moment = require("moment");
const getTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const result = await transactionModel.getTransaction(transaction_id);
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "transaction not found",
      });
      return;
    }
    const dataResult = [];
    // return console.log(result.rows);
    // console.log(result.rows);
    result.rows.forEach((data) => {
      const idx = dataResult.findIndex(
        (item) => item.reservation_id === item.reservation_id
      );
      if (idx >= 0) {
        dataResult[idx].seats.push({ seat: data.seats, price: data.price });
      } else {
        dataResult.push({
          transaction_id: data.transaction_id,
          movie_title: data.movie_title,
          cinemas_name: data.cinemas_name,
          show_date: data.show_date,
          show_time: data.show_time,
          movie_category: data.movie_category,
          seats: [{ seat: data.seats, price: data.price }],
          status: data.status,
        });
      }
    });
    res.status(200).json({
      data: dataResult,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { transaction_id, payment_id } = req.body;
    const payment = await transactionModel.cekPayment(payment_id);
    if (payment.rows.length === 0) {
      res.status(404).json({
        msg: "payment not found",
      });
      return;
    }
    const result = await transactionModel.createTransaction(
      transaction_id,
      payment_id
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "transaction failed",
      });
      return;
    }
    const statusOrder = await transactionModel.updateStatusOrder(
      transaction_id
    );
    res.status(200).json({
      data: statusOrder.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getPayment = async (req, res) => {
  try {
    const payment = await transactionModel.getPayment();
    if (payment.rows.length === 0) {
      res.status(404).json({
        msg: "payment not found",
      });
      return;
    }
    res.status(200).json({
      data: payment.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const { id } = req.authInfo;
    const result = await transactionModel.getAllTransaction(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "transaction not found",
      });
      return;
    }
    const dataResult = Object.values(
      result.rows.reduce((acc, obj) => {
        const key = obj.transaction_id;
        const { seats, ...rest } = obj;
        if (!acc[key]) {
          acc[key] = { ...rest, seats: [seats] };
        } else {
          acc[key].seats.push(seats);
        }
        return acc;
      }, {})
    );
    res.status(200).json({
      data: dataResult,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  getTransaction,
  createTransaction,
  getPayment,
  getAllTransaction,
};
