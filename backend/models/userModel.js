import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  middleName: { type: String },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    // required: true,
  },
  notification: {
    type: Array,
    default: [],
  },
  seenNotification: {
    type: Array,
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  selectedCountry: {
    type: Object,
    required: true,
  },
  selectedState: {
    type: Object,
    required: true,
  },
  selectedCity: {
    type: Object,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  streetName: {
    type: String,
    default: "",
  },
  gender: {
    type: Object,
  },
  postalCode: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
  },
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel as UserModel };
