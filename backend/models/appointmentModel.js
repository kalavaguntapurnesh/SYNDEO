import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    bookedName: {
      type: String,
      required: true,
    },
    bookedEmail: {
      type: String,
      required: true,
    },
    bookedCountry: {
      type: String,
      required: true,
    },
    doctorEmail: {
      type: String,
      required: true,
    },
    doctorFirstName: {
      type: String,
      required: true,
    },
    doctorLastName: {
      type: String,
      required: true,
    },
    doctorCountry: {
      type: String,
      required: true,
    },
    doctorCity: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
export { appointmentModel as appointmentModel };
