import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { doctorModel } from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";
import { UserModel } from "../models/userModel.js";

const router = express.Router();

router.post("/getDoctorInfo", authMiddleware, async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.send({ status: true, message: "Doctor Data Found", data: doctor });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error in fetching Interviewer Details",
      error,
    });
  }
});

router.post("/getSingleDoctor", authMiddleware, async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.send({
      status: true,
      message: "Details fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "No Single Interviewer is Present",
      error,
    });
  }
});

router.get("/doctorAppointments", authMiddleware, async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.send({
      status: true,
      message: "Interviewer Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Interviewer Appointments Not Found",
      error,
    });
  }
});

router.post("/updateStatus", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await UserModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "Status Updated",
      message: `Your appointment has been updated and ${status}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.send({
      status: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Status Update Failed",
      error,
    });
  }
});

export { router as doctorRouter };
