import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name is Required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required"],
    },

    phone: {
      type: String,
      required: [true, "Phone No. is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    website: {
      type: String,
    },

    specialization: {
      type: String,
      required: [true, "Specialization is Required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is Required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timingOne: {
      type: String,
      required: [true, "Starting Time is Required"],
    },
    timingTwo: {
      type: String,
      required: [true, "Ending Time is Required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
export { doctorModel as doctorModel };
