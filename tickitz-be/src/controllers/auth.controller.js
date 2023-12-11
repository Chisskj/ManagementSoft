const jwt = require("jsonwebtoken");
const authModels = require("../models/auth.model");
const bcrypt = require("bcrypt");
const env = require("../configs/environment");
// const { sendVerifMail, sendMails } = require("../configs/email");

const MAIL_SETTINGS = {
  host: env.host_link,
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: env.email,
    pass: env.passwordEmail,
  },
};
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

const login = async (req, res) => {
  try {
    // ambil email dan password dari body
    const { body } = req;
    // verifikasi ke db
    const result = await authModels.userVerification(body);
    // jika valid, maka buatkan jwt token
    if (result.rows.length < 1)
      return res.status(401).json({
        msg: "Account not found",
      });
    const { id, role_id, password, phone, image } = result.rows[0];
    // compare password
    const isPasswordValid = await bcrypt.compare(body.password, password);
    console.log(isPasswordValid);
    if (!isPasswordValid)
      return res.status(401).json({
        msg: "Email/Password Salah",
      });
    const payload = {
      id,
      role_id,
      image,
      phone,
    };
    const jwtOptions = {
      expiresIn: "2 days",
    };
    // buat token
    jwt.sign(payload, env.jwtSecret, jwtOptions, async (err, token) => {
      if (err) throw err;
      await authModels.createToken(token);
      res.status(200).json({
        msg: "Login Success",
        token,
        id,
        phone,
        image,
        role_id,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { body } = req;
    const pass = body.password;
    const linkDirect = body.link_direct;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      res.status(404).json({
        msg: "Email Invalid",
      });
    }
    const emailFromDb = await authModels.getEmail(body);
    if (emailFromDb.rows.length === 1) {
      res.status(400).json({
        msg: "Email already exists",
      });
      return;
    }
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    const verifyUrl = `${linkDirect}/${body.email}`;
    const mailoptions = {
      from: "ticketzbk@gmail.com",
      to: `${body.email}`,
      subject: "Verification Your Email 👻",
      html: `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px">
      <h2>Hi.</h2>
      <h4>This Is Your Link Verification</h4>
      <p>${OTP}</p>
      <p style="margin-bottom: 30px">
        Please click
        <a href="${verifyUrl}" style="color: red" target="_blank">here</a> to
        verif your email
      </p>
    </div>
      `,
    };
    transporter.sendMail(mailoptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).json({
          msg: "Email / password invalid",
        });
      } else {
        console.log(`Email send: ${info.response}`);
        const result = await authModels.register(body, hashedPassword, OTP);
        return res.status(200).json({
          data: result.rows,
          msg: "Please Verify your account",
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const verify = async (req, res) => {
  try {
    const { otp } = req.body;
    const { email } = req.params;
    const getOtpDB = await authModels.getOtp(email);
    if (getOtpDB.rows[0].otp !== otp) {
      return res.status(404).json({
        msg: "OTP Not valid",
      });
    }
    const result = await authModels.verify(email);
    res.status(200).json({
      data: result.rows,
      msg: "Verify Succes",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const privateAcces = (req, res) => {
  const { id, email, role_id } = req.authInfo;
  res.status(200).json({
    payload: { id, email, role_id },
    msg: "OK",
  });
};

const createOtp = async (req, res) => {
  try {
    const { email, link_direct } = req.body;
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    const result = await authModels.createOtp(email, OTP);
    console.log(result);
    if (result.rows < 1) {
      return res.status(404).json({
        msg: "Email Belum Terdaftar",
      });
    }
    // console.log(result.rows[0].otp);
    const verifyUrl = `${link_direct}/${email}`;
    const mailoptions = {
      from: "tickitz.tim@gmail.com",
      to: `${email}`,
      subject: "Otp Code Verification 👻",
      html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Hi.</h2>
          <h4>This Is Your Otp</h4>
          <p>${OTP}</p>
          <p style="margin-bottom: 30px;">Please click <a href="${verifyUrl}" style="color: red;">here</a> to verif your email</p>
    </div>
      `,
    };
    transporter.sendMail(mailoptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Internal Server Error",
        });
      } else {
        console.log(`Email send: ${info.response}`);
        // const result = await authModels.register(body, hashedPassword, OTP);
        await authModels.createOtp(email, OTP);
        return res.status(200).json({
          msg: "Please Check Your Email",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { otp } = req.params;
    const otpFromDb = await authModels.getOtpWithOtp(otp);
    // return console.log(otpFromDb);
    if (!otpFromDb.rows || otpFromDb.rows.length < 1) {
      return res.status(404).json({
        msg: "OTP Not valid",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(404).json({
        msg: "Passwords are not the same",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authModels.forgot(otp, hashedPassword);
    res.status(200).json({
      msg: "Change password Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const forgot = async (req, res) => {
  try {
    const { body } = req;
    const { email, link_direct } = req.body;
    const emailFromDb = await authModels.getEmail(body);
    if (emailFromDb.rows.length !== 1) {
      res.status(400).json({
        msg: "Email Not exists",
      });
      return;
    }
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    const verifyUrl = `${link_direct}/${OTP}`;
    const mailoptions = {
      from: "tickitz.tim@gmail.com",
      to: `${email}`,
      subject: "Reset Password Verification 👻",
      html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Hi.</h2>
          <h4>This Is Your Link Verification</h4>
          <p style="margin-bottom: 30px;">Please click <a href="${verifyUrl}" style="color: red;">here</a> to verif your email</p>
    </div>
      `,
    };
    transporter.sendMail(mailoptions, async function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          msg: "Internal Server Error",
        });
      } else {
        console.log(`Email send: ${info.response}`);
        // const result = await authModels.register(body, hashedPassword, OTP);
        await authModels.createOtp(email, OTP);
        res.status(200).json({
          msg: "Please Check Your Email",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const logOut = async (req, res) => {
  try {
    const { authInfo } = req;
    await authModels.createBlackList(authInfo.token);
    res.status(200).json({
      msg: "Log Out Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { authInfo } = req;
    const { body } = req;
    const oldPassword = await authModels.getOldPassword(authInfo.id);
    const isPasswordValid = await bcrypt.compare(
      body.oldPassword,
      oldPassword.rows[0].password
    );
    if (!isPasswordValid)
      return res.status(401).json({
        msg: "Password old Salah",
      });
    if (body.newPassword !== body.confirmPassword) {
      return res.status(401).json({
        msg: "passwords must be the same",
      });
    }
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await authModels.changePassword(hashedPassword, authInfo.id);
    res.status(200).json({
      msg: "Change Password Succes",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  register,
  privateAcces,
  logOut,
  createOtp,
  forgot,
  verify,
  resetPassword,
  changePassword,
};
