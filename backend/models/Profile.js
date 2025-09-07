import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    avatar: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
      require:true
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "",
    },
    birthDate: {
      type: Date,
      default: null,
      require:true
    },
    profession: {
      type: String,
      default: "",
      require:true
    },
    portfolioUrl: {
      type: String,
      default: "",
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
