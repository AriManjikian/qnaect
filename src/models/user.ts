import mongoose, { Schema } from "mongoose";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    links: {
      type: Map,
      of: String,
      default: {},
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export interface UserType {
  _id: string;
  name: string;
  email: string;
  username: string;
  links: { [key: string]: string };
  image: string | StaticImport;
}

export default User;
