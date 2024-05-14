import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { doctorModel } from "../models/doctorModel.js";
import { UserModel } from "../models/userModel.js";

const router = express.Router();

router.get("/getAllOrganizers", authMiddleware, async (req, res) => {
  try {
    const facilitators = await UserModel.find({
      role: { $eq: "organizer" },
    });
    res.send({
      status: true,
      message: "Organizers Fetched",
      data: facilitators,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in Fetching Organizers",
    });
  }
});

router.get("/getAllParticipants", authMiddleware, async (req, res) => {
  try {
    const facilitators = await UserModel.find({
      role: { $eq: "participant" },
    });
    res.send({
      status: true,
      message: "Participants Fetched",
      data: facilitators,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in Fetching Participants",
    });
  }
});

router.get("/getAllFacilitators", authMiddleware, async (req, res) => {
  try {
    const facilitators = await UserModel.find({
      role: { $eq: "facilitator" },
    });
    res.send({
      status: true,
      message: "Facilitators Fetched",
      data: facilitators,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in Fetching Facilitators",
    });
  }
});

router.post("/changeAccountStatus", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await UserModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Interviewer Account Request Has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor === "approved" ? true : false;
    await user.save();
    res.send({
      status: true,
      message: "Account Status Updated Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in Account Status",
      error,
    });
  }
});

// router.post("/applyDoctor", authMiddleware, async (req, res) => {
//   try {
//     const newDoctor = await doctorModel({ ...req.body, status: "pending" });
//     await newDoctor.save();
//     const adminUser = await UserModel.findOne({ isAdmin: true });
//     const notification = adminUser.notification;
//     notification.push({
//       type: "applyDoctor-request",
//       message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied for Interviewer Role`,
//       data: {
//         doctorId: newDoctor._id,
//         name: newDoctor.firstName + " " + newDoctor.lastName,
//         onClickPath: "/admin/doctors",
//       },
//     });
//     console.log(notification);
//     await UserModel.findByIdAndUpdate(adminUser._id, { notification });
//     res.json({ status: true, message: "Application Sent Successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       status: false,
//       message: "Error in applying for Interviewer Role",
//     });
//   }
// });

export { router as adminRouter };
