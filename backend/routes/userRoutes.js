import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import moment from "moment";
import { UserModel } from "../models/userModel.js";
import { doctorModel } from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { forgotMail, sendMail } from "../helpers/sendMail.js";
import { tokenModel } from "../models/Token.js";
import { type } from "os";
import { time } from "console";

//router object
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/updateProfile", authMiddleware, async (req, res) => {
  try {
    const customer = await UserModel.findOneAndUpdate(
      {
        _id: req.body.userId,
      },
      req.body
    );
    console.log(customer);
    res.send({
      status: true,
      message: "Your profile was updated successfully",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Issue in updating profile",
      error,
    });
  }
});

router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    selectedCountry,
    selectedState,
    selectedCity,
    password,
    role,
    phoneNumber,
  } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ message: "User Already Exists" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    phoneNumber,
    selectedCountry,
    selectedState,
    selectedCity,
    password: hashpassword,
    role,
  });
  await newUser.save();
  const adminUser = await UserModel.findOne({ isAdmin: true });
  const notification = adminUser.notification;
  notification.push({
    type: "Applied for Role",
    message: `${lastName} ${firstName} has applied for ${role} role`,
    onClickPath: `/admin/${role}`,
  });
  console.log(notification);
  await UserModel.findByIdAndUpdate(adminUser._id, { notification });
  const token = new tokenModel({
    userId: newUser._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  await token.save();
  console.log(token);
  const link = `http://localhost:8080/auth/confirm/${token.token}`;
  await sendMail(
    email,
    "Welcome to Calendly!!!",
    `Hi, ${lastName} ${firstName}. Thank you for registering with us`,
    `<!DOCTYPE html>
    <html>
      <head>
        <style>
        body {
          font-family: Arial, sans-serif;
          height: 100%;
          width: 100%;
        }
  
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
    
          .header h1 {
            color: #333;
            font-size: 22px;
            font-weight: 600;
            text-align: center;
          }
    
          .content {
            margin-bottom: 30px;
          }
    
          .content p {
            margin: 0 0 10px;
            line-height: 1.5;
          }
    
          .content #para p {
            margin-top: 20px;
          }
    
          .content .button {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            margin-bottom: 20px;
          }
    
          .content .button a {
            border-radius: 40px;
            padding-top: 16px;
            padding-bottom: 16px;
            padding-left: 100px;
            padding-right: 100px;
            background-color: #007ae1;
            text-decoration: none;
            color: white;
            font-weight: 600;
          }
    
          /* .footer {
            text-align: center;
          } */
    
          .footer p {
            color: #999;
            font-size: 14px;
            margin: 0;
            margin-top: 8px;
            margin-bottom: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify your email address to complete registration</h1>
          </div>
          <div class="content">
            <p id="para">Greetings, ${firstName} ${lastName}!</p>
            <p>
              Thanks for your interest in joining Syndeo! To complete your
              registration, we need you to verify your email address.
            </p>
            <p>
              As part of our ongoing efforts to promote trust and protect your
              security, we now require you to obtain an Identity Verification which
              is done by verifying your email.
            </p>
            <div class="button">
              <a href="${link}">Verify Email</a>
            </div>
          </div>
          <p>Thanks for helping to keep Syndeo secure!</p>
          <div class="footer">
            <p>Best regards,</p>
            <p>Team Syndeo</p>
          </div>
        </div>
      </body>
    </html>
    `
  );
  res.send({ status: true, message: "Verify Your Email" });
});

router.get("/confirm/:token", async (req, res) => {
  try {
    const token = await tokenModel.findOne({ token: req.params.token });
    const user = await UserModel.findOne({ _id: token.userId });
    console.log(token);
    await UserModel.updateOne(
      { _id: token.userId },
      { $set: { verified: true } }
    );
    await tokenModel.findByIdAndDelete(token._id);
    user.notification.push({
      type: "Email Verification Success",
      message: "Greetings! Your email verification was successful",
    });
    await user.save();
    res.send("Email Verified Successfully");
  } catch (error) {
    console.log(error);
    return res.json({ message: "Something Error Occurred", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user && user.verified) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Password is Incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Logged In Successfully", token });
  } else {
    return res.json({ message: "User is not Registered" });
  }
});

router.post("/forgetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kalavaguntapurnesh@gmail.com",
        pass: "oamugyjnvtldzgez",
      },
    });

    // const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: "kalavaguntapurnesh@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              height: 100%;
              width: 100%;
              background-color: #f8f9f0;
            }
      
            .container {
              max-width: 900px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
      
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
      
            .header h1 {
              color: #333;
              font-size: 22px;
              font-weight: 600;
              text-align: center;
            }
      
            .content {
              margin-bottom: 30px;
            }
      
            .content p {
              margin: 0 0 10px;
              line-height: 1.5;
              text-align: center;
            }
      
            .button {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
              margin-bottom: 20px;
            }
      
            .button a {
              border-radius: 40px;
              cursor: pointer;
              padding-top: 16px;
              padding-bottom: 16px;
              padding-left: 30px;
              padding-right: 30px;
              background-color: #007ae1;
              text-decoration: none;
              color: white;
              font-weight: 600;
              text-align: center;
            }
      
            .bottom p {
              text-align: center;
            }
      
            .footer p {
              color: #999;
              font-size: 14px;
              margin: 0;
              margin-top: 8px;
              margin-bottom: 8px;
            }
            .footer .footerOne {
              text-align: center;
            }
            .footer .footerTwo {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset your password</h1>
            </div>
            <div class="content">
              <p>This link will expire in 10 minutes.</p>
              <p>If it wasn't done by you, please contact us immediately.</p>
            </div>
            <div class="button">
              <a href="http://localhost:5173/resetPassword/${user._id}/${token}"
                >Reset the password</a
              >
            </div>
            <div class="bottom">
              <p>Thanks for helping to keep Syndeo secure!</p>
            </div>
            <div class="footer">
              <p class="footerOne">Best regards,</p>
              <p class="footerTwo">Team Syndeo</p>
            </div>
          </div>
        </body>
      </html>
      
      
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error in sending Mail" });
      } else {
        return res.json({ status: true, message: "Check Your Email" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/resetPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      return res.json({
        status: false,
        message: "Error in resetting the password",
      });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) =>
              res.json({
                status: true,
                message: "Password Updated Succcessfully",
              })
            )
            .catch((err) => res.json({ message: "Password Updation Failed" }));
        })
        .catch((err) => res.json({ message: "Password Updation secondly" }));
    }
  });
});

router.post("/getUserData", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.json({ message: "User not registered" });
    } else {
      res.send({
        status: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error in userRoute middleware", error });
  }
});

router.post("/existingSchedules", authMiddleware, async (req, res) => {
  try {
    const user = await appointmentModel.find({ userId: req.body.userId });
    // console.log(user);
    res.send({
      status: true,
      message: "Existing Scheduling Fetched Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Issue in fetching appointments",
      error,
    });
  }
});

router.post("/userSchedules", authMiddleware, async (req, res) => {
  try {
    const mySchedules = await appointmentModel.find({
      doctorId: req.body.doctorId,
    });
    // console.log(mySchedules);
    res.send({
      status: true,
      message: "My Existing Scheduling Fetched Successfully",
      data: mySchedules,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Issue in fetching appointments",
      error,
    });
  }
});

router.post("/getNotifications", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    console.log(user);
    const seenNotification = user.seenNotification;
    console.log(seenNotification);
    const notification = user.notification;
    console.log(notification);
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    return res.json({
      status: true,
      message: "All Notifications Marked as Read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in reading Notifications",
    });
  }
});

router.post("/deleteNotifications", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    return res.json({
      status: true,
      message: "All Notifications Deleted",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in deleting Notifications",
    });
  }
});

router.get("/getDoctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.send({
      status: true,
      message: "Interviewers List Data Found",
      data: doctors,
    });
    // console.log(res.data);
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in getting all interviewers for user",
      error,
    });
  }
});

router.post("/getSingleUser", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.id });
    res.status(200).send({
      status: true,
      message: "Sigle User Info Fetched",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      error,
      message: "Erro in Single user info",
    });
  }
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    const interviewer = await UserModel.findOne({ _id: req.body.doctorId });
    const candidate = await UserModel.findOne({ _id: req.body.userId });
    const doctorFirstName = req.body.doctorFirstName;
    const doctorLastName = req.body.doctorLastName;
    const startTime = req.body.startTime.toString();
    const endTime = req.body.endTime.toString();
    const bookedName = req.body.bookedName;
    const doctorEmail = req.body.doctorEmail;
    candidate.notification.push({
      type: "Appointment Booking Success",
      message: `Your Appointment Booking with ${req.body.doctorFirstName} is Successful`,
    });
    await candidate.save();
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    interviewer.notification.push({
      type: "New Appointment Request",
      message: `You've got a new appointment request from ${req.body.bookedName}`,
    });
    await interviewer.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kalavaguntapurnesh@gmail.com",
        pass: "oamugyjnvtldzgez",
      },
    });
    var mailOptions = {
      from: "kalavaguntapurnesh@gmail.com",
      to: doctorEmail,
      subject: "Appointment Booking Successful",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <style>
          body {
            font-family: Arial, sans-serif;
            height: 100%;
            width: 100%;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
      
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
      
            .header h1 {
              color: #333;
              font-size: 22px;
              font-weight: 600;
              text-align: center;
            }
      
            .content {
              margin-bottom: 30px;
            }
      
            .content p {
              margin: 0 0 10px;
              line-height: 1.5;
            }
      
            .content #para p {
              margin-top: 20px;
            }
      
            .content .button {
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
              margin-bottom: 20px;
            }
      
            .content .button a {
              border-radius: 40px;
              padding-top: 16px;
              padding-bottom: 16px;
              padding-left: 100px;
              padding-right: 100px;
              background-color: #007ae1;
              text-decoration: none;
              color: white;
              font-weight: 600;
            }
      
            /* .footer {
              text-align: center;
            } */
      
            .footer p {
              color: #999;
              font-size: 14px;
              margin: 0;
              margin-top: 8px;
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your appointment booking was successful</h1>
            </div>
            <div class="content">
              <p id="para">Greetings, ${bookedName}!</p>
              <p>
                Thanks for your interest in using Syndeo! Your appointment booking with ${doctorFirstName} ${doctorLastName} was succesful. 
              </p>
              <p>
                Your Start Time : ${startTime}
              </p>
              <p>
                Your End Time : ${endTime}
              </p>
              <div class="button">
                <a>Thank You</a>
              </div>
            </div>
            <p>Thank you for helping to keep Syndeo secure!</p>
            <div class="footer">
              <p>Best regards,</p>
              <p>Team Syndeo</p>
            </div>
          </div>
        </body>
      </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error in sending Mail" });
      } else {
        return res.json({ status: true, message: "Check Your Email" });
      }
    });
    res.status(200).send({
      status: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      error,
      message: "Error in booking appointment",
    });
  }
});

router.post("/booking-availability", authMiddleware, async (req, res) => {
  try {
    const fromTime = req.body.startTime;
    const endTime = req.body.endTime;
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      startTime: { $lte: fromTime },
      endTime: { $gte: endTime },
    });
    console.log(appointments);
    if (appointments.length > 0) {
      res.status(200).send({
        status: false,
        message: "Appointment Not Available",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Appointment Available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      error,
      message: "Appointment Not Available",
    });
  }
});

// router.post("/uploadProfile", (authMiddleware, upload), async (req, res) => {
//   try {
//     const customer = await UserModel.findOneAndUpdate(
//       {
//         _id: req.body.userId,
//       },
//       req.body
//     );
//     console.log(customer);
//     res.send({
//       status: true,
//       message: "Profile Image was updated successfully",
//       data: customer,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       status: false,
//       message: "Issue in updating profile",
//       error,
//     });
//   }
// });

export { router as UserRouter };
