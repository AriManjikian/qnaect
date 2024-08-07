import mongoose, { Schema } from "mongoose";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface UserLinkType {
  platform: string;
  url: string;
}

const userLinkSchema = new Schema<UserLinkType>({
  platform: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "First Name",
    },
    occupation: {
      type: String,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    paused: {
      type: Boolean,
      required: true,
      default: false,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    theme: {
      type: String,
    },
    links: {
      type: Map,
      of: userLinkSchema,
      default: {},
    },
    image: {
      type: String,
      required: true,
      default:
        "https://qnaect-aws-s3-arimanjikian.s3.us-east-2.amazonaws.com/default-profile.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export interface UserType {
  _id: string;
  name: string;
  occupation: string;
  bio: string;
  email: string;
  theme: string;
  paused: boolean;
  username: string;
  links: { [key: string]: UserLinkType };
  image: string;
}

export default User;
